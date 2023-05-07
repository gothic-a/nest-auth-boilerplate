import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'
import { CryptoModule } from 'src/crypto/crypto.module'
import { UserController } from './user.controller';

@Module({
	imports: [CryptoModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	providers: [UserService],
	exports: [UserService],
	controllers: [UserController],
})
export class UserModule {}
