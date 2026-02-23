// input handChange handleSubmit
// message 
// mockjs /api/chat 流式输出
// chat 业务
import {
    useChat,
    type Message
} from '@ai-sdk/react';

interface UseChatBotOptions {
    initialMessages?: Message[];
}

export const useChatBot = (options?: UseChatBotOptions) => {
    return useChat({
        // api: '/api/ai/chat',
         api: 'http://localhost:3000/api/ai/chat',
        initialMessages: options?.initialMessages,
        onError: (err) => {
            console.log("chatbot error:",err);
        }
    })
}
