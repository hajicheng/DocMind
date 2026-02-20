import {
  useRef,  // 持久化存储对象，dom 对象的引用
  useState,
  useEffect
} from 'react';
// 第三方库
import AutoPlay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel'

export interface SlideData {
  id: number | string;
  image: string;
  title?: string;
}

interface SlideShowProps {
  slides: SlideData[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const SlideShow:React.FC<SlideShowProps> = ({
  slides,
  autoPlay=true,
  autoPlayDelay=2000
}) => {
//   console.log('SlideShow slides:', slides);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  
  // AutoPlay 比较耗性能 useRef？
  const plugin = useRef(
    autoPlay? AutoPlay({delay: autoPlayDelay, 
      stopOnInteraction: true}):null
  );

  useEffect(() => {
    // console.log(api,'/////')
    if(!api)  return;
    setSelectedIndex(api.selectedScrollSnap());
    const onSelect = () =>  setSelectedIndex(api.selectedScrollSnap());
    api.on('select', onSelect)
    return () => {
      api?.off('select', onSelect)
    }
  }, [api])

  // 如果没有 slides，不渲染
  if (!slides || slides.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">暂无轮播图</div>;
  }
  return (
    <div className="relative w-full">
      <Carousel
        className="w-full"
        setApi={setApi}
        plugins={plugin.current? [plugin.current] : []}
        opts={{loop: true}}
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.reset()}
      >
        <CarouselContent>
        {
          slides.map(({id, image, title}, index) => (
            <CarouselItem key={id}>
              <div className="relative aspect-[16/9] w-full 
              rounded-xl overflow-hidden">
                <img 
                  src={image}
                  alt={title || `slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {
                  title && (
                    <div className="absolute bottom-0 left-0 right-0
                    bg-gradient-to-t from-black/60 to-transparent
                    p-4 text-white">
                      <h3 className="text-lg font-bold">{title}</h3>
                    </div>
                  )
                }
              </div>
            </CarouselItem>
          ))
        }
        </CarouselContent>
      </Carousel>
      {/* 指示器 */}
        <div className='absolute bottom-3 left-0 right-0 flex
          justify-center gap-2
        '>
          {
            // i index 重要 _ 占位， 不会用到 map 参数出席
            slides.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all 
                  ${selectedIndex === i ? 'bg-white w-6' : 'bg-white/50'}`}
              />
            ))
          }
        </div>
    </div>
  )
}
export default  SlideShow