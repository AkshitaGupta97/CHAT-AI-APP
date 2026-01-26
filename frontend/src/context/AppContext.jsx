import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { dummyChats, dummyUserData } from "../assets/dummyData";
import axios from 'axios';
import toast from "react-hot-toast";

const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
console.log("🔥 VITE_SERVER_URL =", import.meta.env.VITE_SERVER_URL);


export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChats, setSelectedChats] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loadingUser, setLoadingUser] = useState(true);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setUser(data.user);
            }
        } catch (err) {
            setUser(null);
        }
        finally {
            setLoadingUser(false);
        }
    };

    const createNewChat = async () => {
        try {
            if (!user) return toast('Login to create a new chat');

            navigate('/');
            await axios.get('/api/chat/create', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            await fetchUserChats();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchUserChats = async () => {
        /*  setChats(dummyChats);
          if (dummyChats.length > 0) {
              setSelectedChats(dummyChats[0]);
          } else {
              setSelectedChats(null);
          }*/
        try {
            const { data } = await axios.get('/api/chat/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setChats(data.chats); // if user has no chat create one.
                if (data.chats.length === 0) {
                    await createNewChat();
                    return fetchUserChats();
                }
                else {
                    setSelectedChats(data.chats[0])
                }
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserChats();
        }
        else {
            setChats([]);
            setSelectedChats(null);
        }
    }, [user]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setUser(null);
            setLoadingUser(false);
        }
    }, [token]);

    const value = {
        navigate, user, setUser, fetchUser, chats, setChats, selectedChats, setSelectedChats,
        theme, setTheme, createNewChat, loadingUser, fetchUserChats, token, setToken, axios
    };

    return (

        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);