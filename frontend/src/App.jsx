import { Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import ChatBox from "./components/ChatBox"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
import { useState } from "react";
import 'prismjs/themes/prism-okaidia.css';
import Loading from "./pages/Loading"
import { useAppContext } from "./context/AppContext"
import Login from "./pages/Login"
// or try: prism-tomorrow.css, prism-okaidia.css, prism-solarizedlight.css
import {Toaster} from 'react-hot-toast'

const App = () => {

  const { user, loadingUser, token } = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === '/loading'|| loadingUser) return <Loading />

  return (
    <>

      <Toaster />

      {!isMenuOpen && <p onClick={() => setIsMenuOpen(true)} className=" bg-gray-500 flex items-center justify-center rounded-md absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"><span className="material-symbols-outlined">menu</span></p>}

      {
        token ? (
          <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
            <div className="flex h-screen w-screen">
              <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              <Routes>
                <Route path="/" element={<ChatBox />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/community" element={<Community />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
            <Login />
          </div>
        )
      }



    </>
  )
}

export default App