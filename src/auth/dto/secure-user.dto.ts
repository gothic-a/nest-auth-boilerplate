import { UserModelDto } from 'src/user/schemas/user.schema'

export type SecureUserDto = Omit<UserModelDto, 'passwordHash'>
