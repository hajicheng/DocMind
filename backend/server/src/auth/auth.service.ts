import {
    ConsoleLogger,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
// nest 内置了jwt模块
// 需要安装的 性能比较好
// @nestjs 插件式的 
// 注入的方式 注入JWT模块
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor (
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {

    }
    // name 查询 
    async login(loginDto: LoginDto) {           
        const { name, password } = loginDto;
        // name 查询
        const user = await this.prisma.user.findUnique({
            where: {
                name,
            }
        })
        // 未查询到用户
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('用户名或密码错误')
        }
        console.log(user,'////')
        // hashed password 比对
        // 模块化分离 ，业务专注
        const tokens = await this.generateTokens(user.id.toString(), user.name);
        return {
            ...tokens,
            user: {
                id: user.id.toString(),
                name: user.name,
            }
        }
}
    async refreshToken(rt:string) {
        try {
            const payload = await this.jwtService.verifyAsync(rt, {
                secret: process.env.TOKEN_SECRET,
            });
            console.log(payload, 'xxxx')
            return this.generateTokens(payload.sub, payload.name);
        } catch(e) {
            throw new UnauthorizedException('Refresh Token 无效 请重新登录')
        }
    }
        // OOP private 方法 复杂度剥离
    private async generateTokens(id:string,name:string) {
            // 用户信息关键 JSON Object
            // 马上用于签发token,生成token，发令枪先装填弹药（payload），先要准备用户对象一样
            const payload = {
                sub: id, // subject 主题 JWT 中规定的 关键字段
                name,
            };

            const [at,rt] = await Promise.all([
                // 颁发两次token access_token
                this.jwtService.signAsync(payload, {
                    expiresIn: '15m', // 有效期 15分钟 更安全 被中间人截获
                    secret:process.env.TOKEN_SECRET,
                }),
                //  refresh_token 刷新
                // 服务器接受我们，用于refresh
                // 服务器再次生成token 给我们
                // 依然使用 15m token 请求
                this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret:process.env.TOKEN_SECRET,
                }),
            ])
            return {
                access_token: at,
                refresh_token: rt,
            }
    }
}   