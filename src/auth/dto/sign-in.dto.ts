import { CreateUserDto } from 'src/user/dto/create-user.dto'

export type SignInDto = Omit<CreateUserDto, 'name'>
