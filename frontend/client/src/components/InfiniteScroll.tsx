import { 
  useRef,
  useEffect,
  useState,
  useCallback
 } from 'react'

// 常量配置
const THROTTLE_DELAY = 500; // 节流延迟
const BOTTOM_THRESHOLD = 100; // 距离底部阈值
const FADE_OUT_DELAY = 500; // 淡出延迟
const RESET_DELAY = 1500; // 重置延迟

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  hasMore,
  onLoadMore,
  isLoading = false,
  children
}) => {
  const [showNoMore, setShowNoMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastTriggerTime = useRef<number>(0);
  
  // 检查是否滚动到底部
  const checkIfAtBottom = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    return scrollHeight - scrollTop - clientHeight < BOTTOM_THRESHOLD;
  }, []);
  
  // 检测并触发的核心逻辑
  const checkAndTrigger = useCallback(() => {
    if (isLoading || !checkIfAtBottom()) return;
    
    const now = Date.now();
    if (now - lastTriggerTime.current < THROTTLE_DELAY) return;
    
    lastTriggerTime.current = now;
    
    if (hasMore) {
      onLoadMore();
    } else {
      setShowNoMore(true);
    }
  }, [isLoading, hasMore, onLoadMore, checkIfAtBottom]);
  
    useEffect(() => {
    // 通用的触发处理函数
    const handleScrollOrTouch = () => checkAndTrigger();
    
    // 滚轮事件处理（仅向下滚动时触发）
    const handleWheel = (e: WheelEvent) => {
        if (e.deltaY > 0) checkAndTrigger();
    };

    // 注册所有事件监听
    window.addEventListener('scroll', handleScrollOrTouch);
    window.addEventListener('touchmove', handleScrollOrTouch, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    // 组件卸载时移除所有监听（避免内存泄漏）
    return () => {
        window.removeEventListener('scroll', handleScrollOrTouch);
        window.removeEventListener('touchmove', handleScrollOrTouch);
        window.removeEventListener('wheel', handleWheel);
    };
    }, [checkAndTrigger]); // 依赖项仅保留 checkAndTrigger，保证依赖数组简洁

  
  // 监听 hasMore 变化，自动显示提示
  useEffect(() => {
    if (!hasMore && !isLoading && checkIfAtBottom()) {
      setShowNoMore(true);
    }
  }, [hasMore, isLoading, checkIfAtBottom]);
  
  // 处理"没有更多了"的显示和淡出动画
  useEffect(() => {
    if (!showNoMore) return;
    
    setIsVisible(true);
    
    const fadeTimer = setTimeout(() => setIsVisible(false), FADE_OUT_DELAY);
    const resetTimer = setTimeout(() => {
      setShowNoMore(false);
      setIsVisible(false);
      lastTriggerTime.current = 0;
    }, RESET_DELAY);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(resetTimer);
    };
  }, [showNoMore]);
  
  return (
    <>
      {children}
      {isLoading && (
        <div className="text-center py-2 text-sm text-muted-foreground">
          加载中...
        </div>
      )}
      {showNoMore && !isLoading && (
        <div 
          className={`transition-all duration-500 ease-out ${
            isVisible 
              ? 'opacity-100 max-h-20 translate-y-0' 
              : 'opacity-0 max-h-0 -translate-y-2'
          }`}
        >
          <div className="text-center py-2 text-sm text-muted-foreground">
            没有更多了
          </div>
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
