import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

export type UserDocument = User & Document

@Schema({
	timestamps: true,
})
export class User {
	@Prop({ required: true })
	email: string

	@Prop({ required: true })
	passwordHash: string

	@Prop({ required: true })
	name: string

	toPlainModel: () => UserModelDto
}

export type UserModelDto = User & { _id: ObjectId }

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.toPlainModel = function (): UserModelDto {
	const options = {
		versionKey: false,
		transform: (_, ret: Record<string, any>) => {
			delete ret.createdAt
			delete ret.updatedAt
		},
	}

	return this.toObject(options)
}
