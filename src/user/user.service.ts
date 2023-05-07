import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import { Model, ObjectId } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { CryptoService } from 'src/crypto/crypto.service'
import type { UserModelDto } from './schemas/user.schema'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>, private cryptoService: CryptoService) {}

	async createUser(dto: CreateUserDto): Promise<UserModelDto> {
		const existsUser = await this.userModel.findOne({ email: dto.email })

		if (existsUser) throw new BadRequestException('user with provided email exists')

		const passwordHash = await this.cryptoService.createHash(dto.password)

		const user = await this.userModel.create({
			name: dto.name,
			email: dto.email,
			passwordHash,
		})

		return user.toPlainModel()
	}

	async findUserByEmail(email: string): Promise<UserModelDto> {
		const user = await this.userModel.findOne({ email })

		if (!user) throw new NotFoundException()

		return user.toPlainModel()
	}

	async findUserById(id: ObjectId): Promise<UserModelDto> {
		const user = await this.userModel.findById(id)

		return user.toPlainModel()
	}

	async getUsersList(): Promise<UserModelDto[]> {
		const users = await this.userModel.find({})

		return users.map((user) => user.toPlainModel())
	}
}
