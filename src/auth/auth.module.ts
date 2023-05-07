import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'
import { CryptoModule } from 'src/crypto/crypto.module'
import { TokenModule } from 'src/token/token.module'

@Module({
	imports: [UserModule, CryptoModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
