import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const change_password = async (ctx: Context) => {
	const { password } = ctx.request.body
	const hashed = bcrypt.hashSync(password, 10)
	await prisma.user.update({
		where: {
			id: ctx.auth_id
		},
		data: {
			password: hashed
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const change_email = async (ctx: Context) => {
	const { email } = ctx.request.body
	await prisma.user.update({
		where: {
			id: ctx.auth_id
		},
		data: {
			email: email
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const change_is_public = async (ctx: Context) => {
	const { is_public } = ctx.request.body
	await prisma.user.update({
		where: {
			id: ctx.auth_id
		},
		data: {
			is_public: is_public
		}
	})
	return ctx.body = 200
}

export {
	change_password,
	change_email,
	change_is_public
}
