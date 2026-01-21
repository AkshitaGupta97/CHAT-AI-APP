import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext"
import { DarkLogo, LightLogo } from "../assets/logo";
import Message from "./Message";

const ChatBox = () => {
  const {selectedChats, theme} = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(selectedChats){
      setMessages(selectedChats.messages);
    }
  }, [selectedChats])

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat message */}
      <div className="flex-1 mb-5 overflow-y-scroll">
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
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-white animate-bounce"></div>
          </div>
        }

      </div>
      {/* prompt input box */}
      <form >

      </form>
    </div>
  )
}

export default ChatBox