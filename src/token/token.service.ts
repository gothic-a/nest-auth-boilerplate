import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SecureUserDto } from 'src/auth/dto/secure-user.dto'

@Injectable()
export class TokenService {
	constructor(private jwtService: JwtService) {}

	generateToken(payload: SecureUserDto): string {
		return this.jwtService.sign(payload)
	}
}
