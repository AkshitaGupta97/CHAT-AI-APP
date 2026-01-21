import { Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import ChatBox from "./components/ChatBox"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
import { useState } from "react";
import 'prismjs/themes/prism-okaidia.css';
import Loading from "./pages/Loading"
// or try: prism-tomorrow.css, prism-okaidia.css, prism-solarizedlight.css


const App = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname} = useLocation();

  if(pathname === '/loading') return <Loading />

  return (
    <>
      {!isMenuOpen && <p onClick={() => setIsMenuOpen(true)} className=" bg-gray-500 flex items-center justify-center rounded-md absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"><span className="material-symbols-outlined">menu</span></p> }

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

    </>
  )
}

export default App