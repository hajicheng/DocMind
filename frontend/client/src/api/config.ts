import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

// 接口地址都以/api开始
// axios.defaults.baseURL = 'http://localhost:5173/api'
// axios.defaults.baseURL = 'http://localhost:3000/api'
const instance = axios.create({
//   baseURL: 'http://localhost:3000/api'
  baseURL: 'http://localhost:5173/api'
})
 instance.interceptors.request.use(config => {
  // 如果 store 中有 accessToken 字段，则添加到请求头
  // const token = useUserStore.getState().accessToken;
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config
})

export default instance;
