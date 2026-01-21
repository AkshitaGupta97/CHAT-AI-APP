const Message = ({ message }) => {
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-200 dark:bg-[#5737C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.text}</p>
            <span>{message.timestamp}</span>
          </div>
          <p className="w-8 rounded-full">
            <span className="material-symbols-outlined">account_circle</span>
          </p>
        </div>
      ) : (
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4">
          {message.isImage ? (
            <img
              className="w-full max-w-md mt-2 rounded-md"
              src="https://img.freepik.com/premium-psd/png-animated-girl-using-laptop_53876-191180.jpg" alt="mess" /> 
          ) : (
            <div className="text-sm dark:text-primary reset-tw">
              {message.text}
            </div>
          )}
          <span>{message.timestamp}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
