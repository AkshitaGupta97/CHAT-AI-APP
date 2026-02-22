import moment from "moment";
import { useEffect } from "react";
import Markdown from "react-markdown";
import Prism from "prismjs";

const Message = ({ message }) => {

  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);

  return (
    <div className="px-1 sm:px-2">
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-3 sm:my-4 gap-2">

          {/* Message Bubble */}
          <div className="
            flex font-semibold flex-col gap-2
            p-2 px-3 sm:px-4  bg-slate-300 dark:bg-slate-700
            border border-[#80609F]/30 rounded-md max-w-[85%] sm:max-w-xl md:max-w-2xl
          ">
            <p className="text-xs sm:text-sm dark:text-primary break-words">
              {message.content}
            </p>

            <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          {/* Avatar */}
          <div className="
            w-8 h-8 sm:w-10 sm:h-10
            rounded-full
            bg-gray-400 dark:bg-purple-600
            flex items-center justify-center
          ">
            <span className="material-symbols-outlined text-lg sm:text-xl">
              account_circle
            </span>
          </div>

        </div>
      ) : (
        <div className="
          inline-flex flex-col font-semibold  text-xs sm:text-sm
          gap-2 p-2 px-3 sm:px-4  max-w-[90%] sm:max-w-xl
          bg-primary/60 dark:bg-[#57317C]/30 border border-[#80609F]/30  rounded-md my-3 sm:my-4
        ">

          {message.isImage ? (
            <img
              className="w-full max-w-full sm:max-w-md mt-2 rounded-md"
              src={message.content}
              alt="generated"
            />
          ) : (
            <div className="text-xs sm:text-sm dark:text-primary reset-tw break-words">
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;