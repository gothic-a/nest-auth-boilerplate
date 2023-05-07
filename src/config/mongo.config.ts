import { ConfigService } from '@nestjs/config'
import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose'

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
	const uri = getMongoString(configService)

	return {
		uri,
	}
}

const getMongoString = (configService: ConfigService): string => {
	return (
		'mongodb://' +
		// `${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}` +
		// '@' +
		`${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}` +
		'/' +
		configService.get('MONGO_DATABASE')
	)
}
