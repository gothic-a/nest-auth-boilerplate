import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class CryptoService {
	async createHash(value: string): Promise<string> {
		const rounds = 10

		return await hash(value, rounds)
	}

	async compareToHash(value: string, hash: string): Promise<boolean> {
		return await compare(value, hash)
	}
}
