import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Loading = () => {

  const navigate = useNavigate('/');

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#792db7] via-[#974dd3] to-[#340495] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl">
      <div className="w-12 h-12 rounded-full border-3 border-white border-t-transparent animate-spin"></div>
    </div>
  )
}

export default Loading