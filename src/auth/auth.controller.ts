import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { LocalGuard } from './guards/local.guard'
import type { Request as RequestType } from 'express'
import { TokenWithUser } from './interfaces/auth.interfaces'
import { SecureUserDto } from './dto/secure-user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalGuard)
	@Post('sign-in')
	async signIn(@Request() req: RequestType & { user: SecureUserDto }) {
		const userPayload = req.user

		return this.authService.signIn(userPayload)
	}

	@Post('sign-up')
	async signUp(@Body() dto: CreateUserDto): Promise<TokenWithUser | never> {
		return this.authService.signUp(dto)
	}
}
