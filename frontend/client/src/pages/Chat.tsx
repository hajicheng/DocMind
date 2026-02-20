import { useChatBot } from '@/hooks/useChatBot';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Camera, Image, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

// AI 头像组件
const AIAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B7FFF] to-[#00D3F3] flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
    </div>
);

// 用户头像组件
const UserAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </div>
);

// 格式化时间
const formatTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// 欢迎消息组件
const WelcomeMessage = () => (
    <div className="flex items-start gap-3 mb-4">
        <AIAvatar />
        <div className="flex-1">
            <div className="bg-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-4 py-3 shadow-sm max-w-[260px]">
                <p className="text-sm text-gray-900 leading-relaxed">
                    您好！我是小荷AI医生，很高兴为您服务。请描述您的症状，我会尽力为您提供专业的健康建议。
                </p>
            </div>
            <p className="text-xs text-gray-400 mt-2 ml-2">{formatTime()}</p>
        </div>
    </div>
);

// 加载状态组件
const LoadingMessage = () => (
    <div className="flex items-start gap-3">
        <AIAvatar />
        <div className="bg-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-4 py-3 shadow-sm">
            <span className="animate-pulse text-gray-500">正在输入...</span>
        </div>
    </div>
);

// 消息组件
const Message = ({ role, content }: { role: string; content: string }) => {
    const isUser = role === 'user';
    return (
        <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
            {isUser ? <UserAvatar /> : <AIAvatar />}
            <div className="flex-1">
                <div className={`px-4 py-3 shadow-sm max-w-[260px] ${
                    isUser
                        ? 'bg-[#C8E6C9] text-gray-900 rounded-2xl ml-auto'
                        : 'bg-white text-gray-900 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl'
                }`}>
                    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{content}</p>
                </div>
                <p className={`text-xs text-gray-400 mt-2 ${isUser ? 'text-right mr-2' : 'ml-2'}`}>
                    {formatTime()}
                </p>
            </div>
        </div>
    );
};

export default function Chat() {
    const navigate = useNavigate();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChatBot();
    
    // 自动调整 textarea 高度
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = '48px';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }, [input]);
    
    // 消息更新时自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) handleSubmit(e);
    };

    return (
        <div className="flex flex-col h-screen bg-[#F9FAFB] overflow-hidden">
            {/* 顶部导航栏 */}
            <header className="flex items-center justify-between h-[72px] px-3 bg-white border-b border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-normal text-gray-900">小荷AI医生</h1>
                <div className="w-10" />
            </header>

            {/* 聊天消息区域 */}
            <ScrollArea className="flex-1 px-4 py-4 overflow-y-auto">
                {messages.length === 0 ? (
                    <WelcomeMessage />
                ) : (
                    <div className="space-y-4">
                        {messages.map((m, idx) => (
                            <Message key={idx} role={m.role} content={m.content} />
                        ))}
                        {isLoading && <LoadingMessage />}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </ScrollArea>

            {/* 底部输入区域 */}
            {/* 底部整体区域 */}
            <form
                onSubmit={onSubmit}
                className="px-4 pb-4 pt-2 bg-[#F9FAFB] flex flex-col"
            >
                {/* 附件按钮区域 */}
                <div className="flex gap-3 mb-2">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 h-8 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center active:scale-95 active:shadow-inner transition-all duration-150"
                    >
                        <Camera className="w-4 h-4 mr-1 text-gray-600" />
                        <span className="text-sm text-gray-700">拍照</span>
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 h-8 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center active:scale-95 active:shadow-inner transition-all duration-150"
                    >
                        <Image className="w-4 h-4 mr-1 text-gray-600" />
                        <span className="text-sm text-gray-700">照片</span>
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 h-8 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center active:scale-95 active:shadow-inner transition-all duration-150"
                    >
                        <FileText className="w-4 h-4 mr-1 text-gray-600" />
                        <span className="text-sm text-gray-700">本地文件</span>
                    </Button>
                </div>

                {/* 输入区域 */}
                <div className="flex items-end gap-3">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        placeholder="请描述您的症状..."
                        disabled={isLoading}
                        rows={1}
                        className="flex-1 bg-white border border-gray-200 rounded-3xl shadow-sm text-base placeholder:text-gray-400 min-h-[48px] px-4 py-3 text-lg resize-none leading-relaxed"
                        style={{ overflowY: 'hidden', height: '48px' }}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-12 h-12 rounded-full bg-[#2B7FFF] hover:bg-[#1E6FE8] shadow-sm p-0 flex items-center justify-center flex-shrink-0"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </Button>
                </div>
            </form>

        </div>
    );
}