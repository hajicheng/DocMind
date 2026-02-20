import {
  Suspense,
  lazy
} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Loading from '@/components/Loading';
import MainLayout from '@/layouts/MainLayout';
import { AliveScope } from 'react-activation';

const Home = lazy(() => import('@/components/KeepAliveHome'));
const Mine = lazy(() => import('@/pages/Mine'));
const Login = lazy(() => import('@/pages/Login'));
const Chat = lazy(() => import('@/pages/Chat'));
const History = lazy(() => import('@/pages/History'));
const Search = lazy(() => import('@/pages/Search'));

export default function RouterConfig({children}:{children:React.ReactNode}){
  return (
    <Router>
      <AliveScope>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/chat" element={<Chat />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/" element={<MainLayout/>}>
              <Route path="" element={<Home />} />
              <Route path="history" element={<History />} />
              <Route path="mine" element={<Mine />} />
            </Route>
          </Routes>
        </Suspense>
      </AliveScope>
      {children}
    </Router>
  )
}