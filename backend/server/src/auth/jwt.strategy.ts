import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
// 身份验证策略选择jwt
import { Strategy, ExtractJwt } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        // token 在哪里 Bearer 前缀 Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 不是直接调用 PasswordStrategy (Strategy) 封装
      // 自动化的去做
      secretOrKey: process.env.TOKEN_SECRET || 'secretKey',
    })
  }
  // 验证通过后，会把payload 挂载到 req.user 上
  async validate(payload) {
    console.log(payload,'=======')
    return { 
        id: payload.sub,
        name: payload.name };
  }
}