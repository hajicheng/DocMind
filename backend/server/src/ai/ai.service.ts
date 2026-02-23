import {
  Injectable
} from '@nestjs/common';
import { Message } from './dto/chat.dto';
import { ChatDeepSeek } from '@langchain/deepseek';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { OpenAIEmbeddings,DallEAPIWrapper } from '@langchain/openai';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

export function convertToLangchainMessages(messages:Message[])
:(HumanMessage|AIMessage|SystemMessage)[] {
    return messages.map(msg =>{
        switch(msg.role) {
            case "user":
                return new HumanMessage(msg.content);
            case "assistant":
                return new AIMessage(msg.content);
            case "system":
                return new SystemMessage(msg.content);
            default:
                throw new Error(`Unknown role: ${msg.role}`);
        }
    })
}

@Injectable()
export class AIService{
    private embeddings:OpenAIEmbeddings;
    private chatModel:ChatDeepSeek;
    private imageGenerator:DallEAPIWrapper;
    constructor(){
        this.chatModel = new ChatDeepSeek({
            configuration: {
                apiKey: process.env.DEEPSEEK_API_KEY,
                baseURL: process.env.DEEPSEEK_BASE_URL
            },
            model:"deepseek-chat",
            temperature:0.5,
            streaming:true,
        })
        this.embeddings = new OpenAIEmbeddings({
            configuration: {
                apiKey: process.env.OPENAI_API_KEY,
                baseURL: process.env.OPENAI_BASE_URL
            },
            model:'text-embedding-ada-002'
        })
        this.imageGenerator = new DallEAPIWrapper({
            openAIApiKey: process.env.OPENAI_API_KEY,
            n:1,
            size:"1024x1024",
            quality:"standard",
        })
    }

    async chat(messages:Message[],onToken:(token:string)=>void) {
        const langchainMessages = convertToLangchainMessages(messages);
        // console.log(langchainMessages,'.............');
        const stream = await this.chatModel.stream(langchainMessages);
        for await (const chunk of stream) {
            const content = chunk.content as string; // 断言
            // console.log(content,'/////');
            // 用模块化，回调传递
            if(content) {
                onToken(content);
            }
        }
    }
    
    async search(keyword:string,topK = 3) {
        return {
            code:0,
            data:[]
        }
    }

    async avatar(name:string) {
        const imgUrl = await this.imageGenerator.invoke(`
            你是一位头像设计师，
            根据用户的姓名${name},
            设计一个专业的头像。
            风格卡通，时尚，好看。  
        `)
        console.log(imgUrl);
        return imgUrl;
  }

    async rag(question:string) {
        // google 
        // 知识库 embedding 
        // 内存向量数据库
        // 向量-> 向量存储 源文件（Document）this.embedding(llm) 结果存储下来
        const vectorStore = await  MemoryVectorStore.fromDocuments(
          [
            new Document({
                pageContent: 'React是一个用于构建用户界面的JavaScript库',
            }),
            new Document({
                pageContent: "NestJS 是一个用于构建服务器应用的node.js框架，擅长企业级开发"
            }),
            new Document({
                pageContent: "RAG 通过检索外部知识增强大模型的回答能力"
            }),
          ],
          this.embeddings,
        )

        // 相似度
        const docs = await vectorStore.similaritySearch(question, 1);
        console.log(docs);
        // llm chat 的上下文 增强Augument
        // 检索 retrieve
        const context = docs.map(d => d.pageContent).join('\n');
        // 增强 Augmented
        const prompt = `
            你是一个专业的JS工程师，请基于下面资料回答问题。
            资料：
            ${context}

            问题:
            ${question}
        `;
        // 生成 Generation
        const res = await this.chatModel.invoke(prompt);
        console.log(res);
        return res.content;
  
    }

    async git(diff: string) {
        const prompt = ChatPromptTemplate.fromMessages([
        ["system", `你是资深代码审核专家。请根据用户提供的 git diff 内容， 生成一段
            符合Conventional Commits 规范的提交日志。
            要求：1. 格式为<type>(scope):<subject>。
            2. 保持简洁。
            3. 不要输出markdown格式，只输出文本。  
        `],
        ["user", "{diff_content}"]
        ]);
        const chain = prompt.pipe(this.chatModel).pipe(new StringOutputParser());
        const result = await chain.invoke({
            diff_content: diff
        })
        console.log(result, "//////////////");
        return {
            result
        }
    }
}