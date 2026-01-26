import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext"
import { DarkLogo, LightLogo } from "../assets/logo";
import Message from "./Message";
import toast from "react-hot-toast";

const ChatBox = () => {
  const {selectedChats, theme, user, token, axios, setUser} = useAppContext();

  const containerRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      if(!user) return toast('Login to send message...')
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(selectedChats){
      setMessages(selectedChats.messages);
    }
  }, [selectedChats]);

  useEffect(() => {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight, 
      behavior: "smooth"
    })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat message */}
      <div ref={containerRef} className=" flex-1 mb-5 overflow-y-scroll">
        {
          messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
              <div className="w-full max-w-56 sm:max-w-68">{theme==='dark' ? <DarkLogo /> : <LightLogo /> }</div>
              <p className="mt-5 text-3xl sm:text-3xl text-center text-gray-500 dark:text-white/30">Ask me anything...</p>
            </div>
          )
        }
        {
          messages.map((message, index) => <Message key={index} message={message} /> )
        }

        {/* Three dots Loadings */}
        {
          loading && <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-2 rounded-full bg-pink-600 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-2 rounded-full bg-gray-700 dark:bg-pink-600 animate-bounce"></div>
            <div className="w-1.5 h-2 rounded-full bg-pink-600 dark:bg-white animate-bounce"></div>
          </div>
        }

      </div>

       {
        mode === 'image' && (
          <label className="inline-flex font-semibold items-center gap-2 mb-3 text-sm mx-auto" >
            <p className="text-xs">Publish Generaded Image to Community</p>
            <input type="checkbox" className="cursor-pointer" checked={isPublished} onChange={(e)=> setIsPublished(e.target.checked)} />
          </label>
        )
       } 

      {/* prompt input box */}
      <form onSubmit={onSubmit}
        className="bg-primary/80 dark:bg-slate-800 font-semibold text-xs border border-primary/80 dark:border-slate-300 rounded-full w-full max-x-2xl p-3 pl-4 mx-auto flex gap-4 items-center"
       >
        <select onChange={(e) => setMode(e.target.value)} className="text-sm pl-3 pr-2 outline-none">
          <option className="dark:bg-slate-900" value="text">Text</option>
          <option className="dark:bg-slate-900" value="image">Image</option>
        </select>
        <input  onChange={(e) => setPrompt(e.target.value)} value={prompt} className="flex-1 w-full text-sm outline-none"
          type="text" placeholder="Ask with Chatty-Ai" required />

        <button disabled={loading} className="bg-purple-900 rounded-full text-center p-0.5">
          <p className="w-8 cursor-pointer"><span className="material-symbols-outlined text-white">send</span></p>
        </button>
      </form>
    </div>
  )
}

export default ChatBox