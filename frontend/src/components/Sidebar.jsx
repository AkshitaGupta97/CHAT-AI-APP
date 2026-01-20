import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { DarkLogo, LightLogo } from "../assets/logo";
import moment from "moment";

const Sidebar = () => {
  const { chats,navigate, setSelectedChats, theme, setTheme, user } = useAppContext();
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#2f0952] to-[#000000]/30 border-r border-[#470229]/80 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1">
      {/* logo */}
      <div>{theme === "dark" ? <DarkLogo /> : <LightLogo />}</div>

      {/* button "New Chats" */}
      <button className="flex justify-center items-center font-semibold w-full py-2 mt-10 text-white bg-gradient-to-r from-[#2f0952] to-[#470229] text-md rounded-md cursor-pointer ">
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* search conversation */}
      <div className="flex items-center font-semibold text-xs gap-2 mt-4 border border-gray-600 dark:border-white/40 rounded-md">
        <p>
          <span className="material-symbols-outlined text-xl">search</span>
        </p>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="text-md placeholder:text-gray-600 outline-none"
        />
      </div>

      {/* Recent chats */}
      {chats.length > 0 && <p className="mt-4 font-semibold bg-gradient-to-r text-white text-center p-1 rounded-2xl from-[#2f0952] to-blue-300 text-md">Recent Chats</p>}
      <div className="flex-1 font-semibold overflow-y-scroll mt-3 text-xs space-y-2">
        {chats
          .filter((chat) =>
            chat.message?.[0]
              ? chat.message[0].content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              key={chat._id}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-600 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
            >
              <div>
                <p className="truncate w-full">
                  {Array.isArray(chat.message) && chat.message.length > 0
                    ? chat.message[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <p className="hidden group-hover:block w-4 cursor-pointer not-dark:invert">
                <span className="material-symbols-outlined">delete</span>
              </p>
            </div>
          ))}
      </div>

       {/* Community images */}   

       <div onClick={() => {navigate('/community')}} className="flex items-center justify-center gap-2 font-semibold mt-4  bg-gradient-to-r text-white text-center p-1 rounded-2xl from-[#2f0952] to-blue-600 cursor-pointer hover:scale-100 transition-all">
          <div><span className=" material-symbols-outlined">imagesmode</span></div>
          <div className="flex flex-col text-md">
            <p>Community Images</p>
          </div>
       </div>

    </div>
  );
};

export default Sidebar;