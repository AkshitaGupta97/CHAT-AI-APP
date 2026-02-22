import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext"
import { DarkLogo, LightLogo } from "../assets/logo";
import Message from "./Message";
import toast from "react-hot-toast";

const ChatBox = () => {
  const { selectedChats, theme, user, token, axios, setUser } = useAppContext();

  const containerRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) return toast('Login to send message...');
      setLoading(true);

      const promptCopy = prompt;
      setPrompt('');

      setMessages(prev => [
        ...prev,
        {
          role: 'user',
          content: promptCopy,
          timestamp: Date.now(),
          isImage: false
        }
      ]);

      const { data } = await axios.post(
        `/api/message/${mode}`,
        { chatId: selectedChats._id, prompt: promptCopy, isPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setMessages(prev => [...prev, data.reply]);

        if (mode === 'image') {
          setUser(prev => ({ ...prev, credits: prev.credits - 2 }));
        } else {
          setUser(prev => ({ ...prev, credits: prev.credits - 1 }));
        }
      } else {
        toast.error(data.message);
        setPrompt(promptCopy)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedChats) {
      setMessages(selectedChats.messages);
    }
  }, [selectedChats]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth"
    })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col justify-between 
    m-3 sm:m-5 md:m-8 lg:m-10 
    max-md:mt-16 
    w-full overflow-hidden">

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 mb-4 overflow-y-auto pr-1 sm:pr-2"
      >
        {
          messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-primary px-4">
              <div className="w-full max-w-48 sm:max-w-64">
                {theme === 'dark' ? <DarkLogo /> : <LightLogo />}
              </div>
              <p className="mt-5 text-xl sm:text-2xl md:text-3xl text-center text-gray-500 dark:text-white/30">
                Ask me anything...
              </p>
            </div>
          )
        }

        {
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        }

        {
          loading && (
            <div className="loader flex items-center gap-1.5 mt-3">
              <div className="w-1.5 h-2 rounded-full bg-pink-600 dark:bg-white animate-bounce"></div>
              <div className="w-1.5 h-2 rounded-full bg-gray-700 dark:bg-pink-600 animate-bounce"></div>
              <div className="w-1.5 h-2 rounded-full bg-pink-600 dark:bg-white animate-bounce"></div>
            </div>
          )
        }
      </div>

      {mode === 'image' && (
        <label className="inline-flex font-semibold items-center gap-2 mb-3 text-xs sm:text-sm mx-auto">
          <p className="text-xs">Publish Generated Image to Community</p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="bg-primary/80 dark:bg-slate-800 
        font-semibold text-xs sm:text-sm border border-primary/80 dark:border-slate-300 
        rounded-full  w-full p-2 sm:p-3 pl-3 sm:pl-4 mx-auto  flex gap-2 sm:gap-4  items-center"
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          className="text-xs sm:text-sm pl-2 pr-1 outline-none bg-transparent"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="flex-1 w-full text-xs sm:text-sm outline-none bg-transparent"
          type="text"
          placeholder="Ask with Chatty-Ai"
          required
        />

        <button disabled={loading} className="bg-purple-900 rounded-full p-1 sm:p-1.5">
          <span className="material-symbols-outlined text-white text-lg">send</span>
        </button>
      </form>
    </div>
  )
}

export default ChatBox