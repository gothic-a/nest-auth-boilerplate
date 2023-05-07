import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/user/schemas/user.schema'
import { UserService } from 'src/user/user.service'
import { SecureUserDto } from '../dto/secure-user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService, private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate(payload: SecureUserDto): Promise<User | never> {
		const user = await this.userService.findUserById(payload._id)

		if (!user) throw new UnauthorizedException()

		return user
	}
}
