import { SecureUserDto } from '../dto/secure-user.dto'

export interface AccessToken {
	access_token: string
}

export interface TokenWithUser extends AccessToken {
	user: SecureUserDto
}
