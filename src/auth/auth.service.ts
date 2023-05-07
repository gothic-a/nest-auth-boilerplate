import { Injectable, BadRequestException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { TokenService } from 'src/token/token.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { AccessToken, TokenWithUser } from './interfaces/auth.interfaces'
import { SecureUserDto } from './dto/secure-user.dto'

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private tokenService: TokenService) {}

	async signIn(payload: SecureUserDto): Promise<AccessToken> {
		return {
			access_token: this.tokenService.generateToken(payload),
		}
	}

	async signUp(dto: CreateUserDto): Promise<TokenWithUser | never> {
		const user = await this.userService.createUser(dto)

		if (!user) throw new BadRequestException()

		console.log(user)

		const { passwordHash, ...payload } = user

		return {
			user: payload,
			access_token: this.tokenService.generateToken(payload),
		}
	}
}
