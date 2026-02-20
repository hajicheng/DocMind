import { create } from 'zustand';
import type {SlideData} from '@/components/SlideShow';
import type { Post } from '@/types';
import { fetchPosts } from '@/api/posts';

interface HomeState {
  banners: SlideData[];
  posts: Post[];
  loadMore: () => Promise<void>;
  loading: boolean;
  hasMore: boolean;
  page: number;
}
// set方法 用于修改状态
// get方法用户 获取最新的状态 zustand 提供
export const useHomeStore = create<HomeState>((set, get) => ({
  banners:[{
      id: 1,
      title: "医路前行，始于足下",
      image: "https://www2.scut.edu.cn/_upload/article/images/00/6d/e8ccd1714f06a32d6aa2f8893397/57b3e89f-96e0-4599-bfb4-fa1434cad973.jpg",
    },
    {
      id: 2,
      title: "深入交流医学教育发展的前沿话题",
      image: "http://www.cmm.zju.edu.cn/_upload/article/images/9b/48/2b79dea748348a067f5d1c3713ec/f210d6bc-0a76-40f5-96fa-346fdf721e11.jpg",
    },
    {
      id: 3,
      title: "AI 与医学的\"共生\"之道",
      image: "https://imagepphcloud.thepaper.cn/pph/image/347/575/988.jpg",
  }],
  page: 1, // 响应式， page++
  loading: false,
  hasMore: true,
  posts:[],
  loadMore: async () => {
    // loading 开关状态 
    if (get().loading) return; // 避免之前的loadMore还没有执行完，又触发 
    // 加载中... 更新状态时, set 只需要传我们想更新的
    set({ loading: true });
    try {
      const { items } = await fetchPosts(get().page);
      if (items.length === 0) { // 所有数据都加载完了 
        set({hasMore: false});
      } else {
        set({
          posts: [...get().posts, ...items],
          page: get().page + 1
        })
      }
    } catch(err) {
      console.error("加载失败", err);
    } finally {
      set({ loading: false });
    }
  }
}))