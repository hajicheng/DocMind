import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Pill, HeartPulse, CalendarCheck } from 'lucide-react';

export default function QuickService() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      name: 'AI问诊',
      icon: Brain,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      name: '用药查询',
      icon: Pill,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 3,
      name: '健康监测',
      icon: HeartPulse,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: 4,
      name: '体检预约',
      icon: CalendarCheck,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const handleServiceClick = async (serviceId: number) => {
    if (isLoading) return; // 防止重复点击
    
    setIsLoading(true);
    try {
      // AI问诊跳转到chat页面
      if (serviceId === 1) {
        navigate('/chat');
      } else {
        // 其他服务暂未实现
        console.log('点击了服务:', serviceId);
      }
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-4">
      <h3 className="text-lg font-normal mb-4 text-gray-800">快捷服务</h3>
      <div className="grid grid-cols-4 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              disabled={isLoading}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all duration-300 ease-out group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
            >
              <div className={`w-14 h-14 rounded-full ${service.bgColor} flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-xl group-active:translate-y-0`}>
                <Icon className={`w-7 h-7 ${service.iconColor} transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-6`} />
              </div>
              <span className="text-xs text-gray-700 text-center transition-all duration-300 ease-out group-hover:font-semibold group-hover:text-gray-900 group-hover:scale-105">{service.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
