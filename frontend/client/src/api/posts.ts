import axios from './config';
import type { Post } from '@/types';

export const fetchPosts = async (page:number = 1, 
  limit:number=10): Promise<{ items: Post[] }> => {
    try {
      const response = await axios.get('/posts', {
        params: {
          page,
          limit
        }
      })
    //   console.log(response,'///');
      return response.data;
    } catch(err) {
      console.error('Failed to fetch posts:', err);
      return { items: [] };
    }
}   
// 发表文章
export const createPost = async () => {
  return axios.post('/posts',{
    title:'121212121',
    content:'adaddadada',
  });
}