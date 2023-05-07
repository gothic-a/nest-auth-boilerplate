import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UserService } from 'src/user/user.service'
import { CryptoService } from 'src/crypto/crypto.service'
import { SecureUserDto } from '../dto/secure-user.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService, private cryptoService: CryptoService) {
		super({
			usernameField: 'email',
		})
	}

	async validate(email: string, password: string): Promise<SecureUserDto> {
		const user = await this.userService.findUserByEmail(email)

		if (!user) throw new UnauthorizedException()

		const { passwordHash, ...partialUser } = user
		if (this.cryptoService.compareToHash(password, passwordHash)) return partialUser
	}
}
