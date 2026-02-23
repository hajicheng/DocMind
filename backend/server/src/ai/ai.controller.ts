import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res
} from '@nestjs/common';
import { AIService } from './ai.service'
import { ChatDto } from './dto/chat.dto'
import { SearchDto } from './dto/search.dto'
 
@Controller('ai')
export class AIController{
  constructor(private readonly aiService: AIService){}

  @Post('chat')
  async chat(@Body() chatDto: ChatDto,@Res() res) {
    // console.log(chatDto);
    // return {
    //     chatDto
    // }
    // 流式响应
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache'); // 每次llm 重新生成
    res.setHeader('Connection', 'keep-alive'); // 保持连接

    try {
        await this.aiService.chat(chatDto.messages, (token:string)=>{
            res.write(`0:${JSON.stringify(token)}\n`);
        });
        res.end();
    } catch (err) {
        console.log(err);
        res.status(500).end()
    }
  }

  @Get('search')
  async search(@Query() dto: SearchDto) {
    const {keyword} = dto;
    let decode = decodeURIComponent(keyword);
    return this.aiService.search(decode)
  }

  @Get('avatar')
  async avatar(@Query('name') name: string) {
    return this.aiService.avatar(name);
  }

  @Post('rag')
  async rag(@Body(){question}:{question:string}) {
    const answer = await this.aiService.rag(question);
    return {
      code:0,
      answer
    }
  }

  @Post('git')
  async git(@Body(){diff}:{diff:string}) {
    console.log(diff);
    return this.aiService.git(diff);
  }
}