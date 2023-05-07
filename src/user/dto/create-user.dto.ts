import type { UserModelDto } from '../schemas/user.schema'

export type CreateUserDto = Omit<UserModelDto, '_id' | 'passwordHash'> & { password: string }
