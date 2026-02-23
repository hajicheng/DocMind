import { MessageSquare } from 'lucide-react';

interface ChatItemProps {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  onClick?: () => void;
}

export default function ChatItem({ title, lastMessage, time, onClick }: ChatItemProps) {
  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <MessageSquare size={20} className="text-blue-500 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{lastMessage}</p>
          <span className="text-xs text-gray-400 mt-2 block">{time}</span>
        </div>
      </div>
    </div>
  );
}
