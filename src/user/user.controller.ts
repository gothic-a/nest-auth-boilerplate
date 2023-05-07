import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserModelDto } from './schemas/user.schema'
import { UserService } from './user.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(JwtGuard)
	@Get('list')
	async getUsersList(): Promise<UserModelDto[]> {
		return await this.userService.getUsersList()
	}
}
