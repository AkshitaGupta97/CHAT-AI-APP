import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { DarkLogo, LightLogo } from "../assets/logo";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats, navigate, setSelectedChats,
    theme, setTheme, user, token,
    createNewChat, axios, setChats, setToken
  } = useAppContext();

  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success("Logged out successfully");
  }

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
      if (!confirmDelete) return;

      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={`
      ${!isMenuOpen && 'max-md:-translate-x-full'} 
      flex flex-col  h-screen  w-72 sm:w-80  max-w-[85%]  p-4 sm:p-5  dark:bg-gradient-to-b from-[#2f0952] to-[#000000]/30  border-r border-[#470229]/80  backdrop-blur-3xl 
       transition-all duration-500  max-md:absolute left-0 top-0  z-50
    `}>

      {theme === "dark" ? <DarkLogo /> : <LightLogo />}

      <button
        onClick={createNewChat}
        className="flex justify-center items-center font-semibold w-full py-2 mt-8 text-white bg-gradient-to-r from-[#6d24b2] to-[#8a0b53] rounded-md"
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      <div className="flex items-center font-semibold text-xs gap-2 mt-4 border border-gray-600 dark:border-white/40 rounded-md px-2 py-1">
        <span className="material-symbols-outlined text-lg">search</span>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="flex-1 outline-none bg-transparent text-sm"
        />
      </div>

      {chats.length > 0 &&
        <p className="mt-4 font-semibold text-white text-center p-1 rounded-2xl bg-gradient-to-r from-amber-300 via-[#710844] to-purple-500 text-sm">
          Recent Chats
        </p>
      }

      <div className="flex-1 overflow-y-auto mt-3 text-xs space-y-2 pr-1">
        {chats
          .filter((chat) =>
            chat.messages?.[0]
              ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
              : chat.userName.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              key={chat._id}
              onClick={() => { navigate('/'); setSelectedChats(chat); setIsMenuOpen(false) }}
              className="p-2 px-3 dark:bg-[#57317C]/10 border border-gray-400 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
            >
              <div>
                <p className="truncate w-full">
                  {Array.isArray(chat.messages) && chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.userName}
                </p>
                <p className="text-xs text-gray-600 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <span
                onClick={(e) => toast.promise(deleteChat(e, chat._id), { loading: "Deleting..." })}
                className="material-symbols-outlined hidden group-hover:block cursor-pointer"
              >
                delete
              </span>
            </div>
          ))}
      </div>

      <div
        onClick={() => { navigate('/community'); setIsMenuOpen(false) }}
        className="flex text-xs items-center justify-center gap-2 font-semibold mt-4 bg-gradient-to-r from-[#2f0952] to-blue-600 text-white p-2 rounded-2xl cursor-pointer"
      >
        <span className="material-symbols-outlined">imagesmode</span>
        Community Images
      </div>

      <div
        onClick={() => { navigate('/credits'); setIsMenuOpen(false) }}
        className="flex items-center border border-gray-500 p-2 rounded-2xl justify-center gap-2 font-semibold mt-2 cursor-pointer"
      >
        <span className="material-symbols-outlined">diamond</span>
        <div className="text-xs">
          <p>Credits: {user?.credits}</p>
          <p className="text-[10px]">Purchase to use Chatty Ai</p>
        </div>
      </div>

      <div className="flex items-center border border-gray-500 p-2 rounded-2xl justify-between mt-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined">routine</span>
          <p>{theme === 'dark' ? "Light Mode" : "Dark Mode"}</p>
        </div>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </div>

      <div className="flex text-xs items-center justify-center gap-2 font-semibold mt-4 bg-gradient-to-r from-[#0d1c8f] to-pink-500 text-white p-2 rounded-2xl group">
        <span className="material-symbols-outlined">account_circle</span>
        <p className="flex-1 truncate">{user ? user.name : 'Login account'}</p>
        {token && (
          <span onClick={logout} className="material-symbols-outlined cursor-pointer">logout</span>
        )}
      </div>

      <p
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center cursor-pointer bg-blue-600 rounded-full md:hidden"
      >
        <span className="material-symbols-outlined text-white text-sm">close</span>
      </p>
    </div>
  );
};

export default Sidebar;