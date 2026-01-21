
import moment from "moment";
import { useEffect } from "react";
import Markdown from 'react-markdown';
import Prism from 'prismjs'

const Message = ({ message }) => {

  useEffect(() => {
    Prism.highlightAll();
  }, [message.text])

  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex font-semibold flex-col gap-2 p-2 px-4 bg-slate-300 dark:bg-slate-700 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.text}</p>
            <span className="text-xs  text-gray-600 dark:text-gray-400">{moment(message.timestamp).fromNow()}</span>
          </div>
          <p className="w-10 h-10 rounded-full bg-gray-400 dark:bg-purple-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">account_circle</span>
          </p>
        </div> 
      ) : (
        <div className="inline-flex flex-col font-semibold text-sm gap-2 p-2 px-4 max-w-xl bg-primary/60 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4">
          {message.isImage ? (
            <img
              className="w-full max-w-md mt-2 rounded-md"
              src="https://img.freepik.com/premium-psd/png-animated-girl-using-laptop_53876-191180.jpg" alt="mess" /> 
          ) : (
            <div className="text-sm dark:text-primary reset-tw">
              <Markdown>{message.text}</Markdown>
            </div>
          )}
          <span className="text-xs text-gray-600 dark:text-gray-400">{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
