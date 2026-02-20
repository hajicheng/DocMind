import {
  useEffect
} from 'react';
import SlideShow from '@/components/SlideShow';
import QuickService from '@/components/QuickService';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import { useHomeStore } from '@/store/home'
import InfiniteScroll from '@/components/InfiniteScroll';
import PostItem from '@/components/PostItem';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Home() {
  const navigate = useNavigate();
  const { 
    banners, 
    posts,
    hasMore,
    loadMore,
    loading
  } = useHomeStore();
  
  // 测试用的硬编码数据
  const testBanners = [
    {
      id: 1,
      title: "测试轮播图 1",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "测试轮播图 2",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
    }
  ];
  
  // console.log('banners:', banners);
  // console.log('testBanners:', testBanners);
  // console.log('posts:', posts, posts.length);
  
  useEffect(() => {
    loadMore();
  }, []);
  return (
    <>
      <div className="pt-4 px-4 pb-0 space-y-4">
        {banners && banners.length > 0 ? (
          <SlideShow slides={banners} />
        ) : (
          <div className="bg-red-100 p-4 rounded">
            <p>轮播图数据为空: {JSON.stringify(banners)}</p>
          </div>
        )}
        <QuickService />
        <div className="container mx-auto py-8 pb-0">
          <h1 className="text-2xl font-bold mb-6">文章列表</h1>
          {/* 通用的滚动到底部加载更多功能 */}
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={loading}
            onLoadMore={loadMore}
          >
            <ul>
            {
              posts.map(post => (
              <PostItem 
                key={post.id}
                post={post}
              />
              ))
            }
            </ul>
            {/* 业务组件 */}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}