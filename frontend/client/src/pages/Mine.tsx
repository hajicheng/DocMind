import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useChatHistory } from '@/store/useChatHistory';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer' ;
import { 
  Camera, 
  Upload, 
  Sparkles, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  Settings, 
  LogOut,
  ChevronRight 
} from 'lucide-react';
import Loading from '@/components/Loading';

export default function Mine() {
  const { user, logout, aiAvatar } = useUserStore();
  const { conversations } = useChatHistory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAction = async (type: string) => {
    setOpen(false);
    if (type === 'ai') {
      setLoading(true);
      await aiAvatar();
      setLoading(false);
    }
  };

  const menuItems = [
    {
      icon: User,
      title: '个人信息',
      description: '管理您的个人资料',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      icon: Bell,
      title: '消息通知',
      description: '设置提醒和通知',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      icon: Shield,
      title: '隐私设置',
      description: '保护您的隐私安全',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      icon: HelpCircle,
      title: '帮助与反馈',
      description: '获取帮助或提供建议',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      icon: Settings,
      title: '设置',
      description: '应用设置和偏好',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-500',
    },
  ];

  return (
    <div className="bg-gray-50 ">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-b-3xl pb-6">
        <div className="px-8 pt-8">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6">
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="h-20 w-20 border-4 border-white/30">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                      {user?.name?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader className="text-left">
                    <DrawerTitle>修改头像</DrawerTitle>
                    <DrawerDescription>请选择一种方式更新您的个人头像</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-base"
                      onClick={() => handleAction('camera')}
                    >
                      <Camera className="mr-3 h-5 w-5 text-blue-500" />
                      拍照
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-base"
                      onClick={() => handleAction('upload')}
                    >
                      <Upload className="mr-3 h-5 w-5 text-blue-500" />
                      从相册上传
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-base bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white"
                      onClick={() => handleAction('ai')}
                    >
                      <Sparkles className="mr-3 h-5 w-5 text-yellow-300" />
                      从AI生成
                    </Button>
                  </div>
                  <DrawerFooter>
                    <Button variant="ghost" className="w-full h-12">
                      取消
                    </Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name || '张医患'}</h2>
              <p className="text-sm text-blue-100">用户ID: {user?.id || '123456789'}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white mb-1">{conversations.length}</p>
              <p className="text-xs text-blue-100">咨询次数</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white mb-1">85</p>
              <p className="text-xs text-blue-100">健康指数</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white mb-1">28</p>
              <p className="text-xs text-blue-100">记录条数</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`${item.bgColor} ${item.iconColor} p-3 rounded-xl`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-base font-semibold text-gray-900">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <Button
          variant="outline"
          className="w-full h-14 rounded-2xl text-base font-semibold border-red-200 text-red-500 hover:bg-red-50"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-5 w-5" />
          退出登录
        </Button>
      </div>

      {/* Version Info */}
      <div className="text-center">
        <p className="text-sm text-gray-400">小荷AI医生 v1.0.0</p>
      </div>

      {loading && <Loading />}
    </div>
  );
}