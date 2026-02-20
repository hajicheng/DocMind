import {
  useEffect
} from 'react'
import './App.css'
import { useUserStore } from '@/store/useUserStore'
import {
  useNavigate,
  useLocation
} from 'react-router-dom';

export const needsLoginPath = ['/mine', '/history', '/chat']

function App({children}: {children: React.ReactNode}) {
  const {isLogin} = useUserStore();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  
  useEffect(() => {
    if (!isLogin && needsLoginPath.includes(pathname)) {
      navigate("/login");
    }
  }, [isLogin, navigate, pathname]);
  return (
    <>
      {children}
    </>
  )
}

export default App