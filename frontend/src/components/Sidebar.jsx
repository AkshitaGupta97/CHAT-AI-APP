import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { DarkLogo, LightLogo } from "../assets/logo";
import moment from "moment";

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {
  const { chats,navigate, setSelectedChats, theme, setTheme, user } = useAppContext();
  const [search, setSearch] = useState("");

  return (
    <div className={` ${!isMenuOpen && 'max-md:-translate-x-full'} flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#2f0952] to-[#000000]/30 border-r border-[#470229]/80 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1`}>
      {/* logo */}
      <div>{theme === "dark" ? <DarkLogo /> : <LightLogo />}</div>

      {/* button "New Chats" */}
      <button className="flex justify-center items-center font-semibold w-full py-2 mt-10 text-white bg-gradient-to-r from-[#6d24b2] to-[#8a0b53] text-md rounded-md cursor-pointer ">
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
      {chats.length > 0 && <p className="mt-4 font-semibold bg-gradient-to-r text-white text-center p-1 rounded-2xl from-amber-300 via-[#710844] to-purple-500 text-md">Recent Chats</p>}
      <div className="flex-1 font-semibold overflow-y-scroll mt-3 text-xs space-y-2">
        {chats
          .filter((chat) =>
            chat.message?.[0]
              ? chat.message[0].content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.userName.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              key={chat._id} onClick={() => {navigate('/'); setSelectedChats(chat); setIsMenuOpen(false) }}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-400 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
            >
              <div>
                <p className="truncate w-full">
                  {Array.isArray(chat.message) && chat.message.length > 0
                    ? chat.message[0].content.slice(0, 32)
                    : chat.userName}
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

       <div onClick={() => {navigate('/community'); setIsMenuOpen(false)}} className="flex text-xs items-center justify-center gap-2 font-semibold mt-6  bg-gradient-to-r text-white text-center p-1 rounded-2xl from-[#2f0952] to-blue-600 cursor-pointer hover:scale-100 transition-all">
          <div><span className=" material-symbols-outlined">imagesmode</span></div>
          <div className="flex flex-col">
            <p>Community Images</p>
          </div>
       </div>

       {/* credit Purchaase images */}   

       <div onClick={() => {navigate('/credits'); setIsMenuOpen(false)}} className="flex items-center justify-between border border-gray-500 p-0.5 rounded-2xl justify-center gap-2 font-semibold mt-2 cursor-pointer hover:scale-100 transition-all">
          <div><span className="material-symbols-outlined">diamond</span></div>
          <div className="flex flex-col text-xs">
            <p>Credits: {user?.credits}</p>
            <p>Purchase to use <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#9c105f] via-purple-500 to-amber-500">Chatty Ai</span> </p>
          </div>
       </div>

       {/* dark mode toogle */}   

       <div className="flex items-center border border-gray-500 p-0.5 rounded-2xl justify-between gap-2 font-semibold mt-2 ">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="material-symbols-outlined">routine</span>
            <p>{theme==='dark'? "Light Mode" : "Dark Mode"}</p>
          </div>

          <label className="relative inline-flex cursor-pointer">
            <input onChange={()=> setTheme(theme==='dark'? 'light' : 'dark')} type="checkbox" className="sr-only peer" checked={theme === 'dark'} />
            
            <div className="w-9 h-5 bg-gray-600 rounded-full peer-checked:bg-purple-700 transition-all"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
          </label>
       </div>

        {/* User Account */}
       <div  className="flex text-xs items-center justify-center gap-2 font-semibold mt-6  bg-gradient-to-r text-white text-center p-1 rounded-2xl from-[#0d1c8f] to-pink-500 cursor-pointer group">
          <div><span className="material-symbols-outlined">account_circle</span></div>
          <p className="flex-1 text-sm dark:text-primary truncate">{user ? user.name : 'Login account'}</p>
          {
            user && <span className="material-symbols-outlined cursor-pointer">logout</span>
          }
       </div>

       <p onClick={()=> setIsMenuOpen(false)}
          className=" text-center p-2 flex items-center justify-center absolute top-3 right-3 w-5 h-5 cursor-pointer bg-blue-600 rounded-full md:hidden not-dark:invert">
          <span className="material-symbols-outlined">close</span>
        </p>

    </div>
  );
};

export default Sidebar;