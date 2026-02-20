import { MessageSquare, SquarePen, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const conversations: any[] = [];
  const navigate = useNavigate();
  
  return (
    <div className="bg-gray-50">
      {/* Title */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex-1" />
          <h1 className="text-lg font-normal text-gray-800">对话</h1>
          <div className="flex-1 flex items-center justify-end gap-4">
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} className="text-gray-800" onClick={() => navigate('/Search')} />
            </button>
            <button className="pr-0.5 hover:bg-gray-100 rounded-full transition-colors">
              <SquarePen size={20} className="text-gray-800" onClick={() => navigate('/Chat')} />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pt-14 pb-16 min-h-[calc(100vh-112px)] flex items-center justify-center">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-sm text-gray-400">暂无对话记录</p>
          </div>
        ) : (
          <div className="w-full px-4 space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <MessageSquare size={20} className="text-blue-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{conversation.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{conversation.lastMessage}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{conversation.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}