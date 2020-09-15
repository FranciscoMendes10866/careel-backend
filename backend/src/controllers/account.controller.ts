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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const change_newsletter = async (ctx: Context) => {
	const { newsletter } = ctx.request.body
	await prisma.user.update({
		where: {
			id: ctx.auth_id
		},
		data: {
			newsletter: newsletter
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const change_job = async (ctx: Context) => {
	const { job, is_public } = ctx.request.body
	await prisma.user.update({
		where: {
			id: ctx.auth_id
		},
		data: {
			job: job,
			is_public: is_public
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_devices = async (ctx: Context) => {
	const devices = await prisma.security.findMany({
		where: {
			user_id: ctx.auth_id
		},
		select: {
			id: true,
			device_platform: true,
			device_product: true,
			device_allowed: true,
			login_date: true
		}
	})
	return ctx.body = { devices }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_devices = async (ctx: Context) => {
	const { device_allowed } = ctx.request.body
	await prisma.security.update({
		where: {
			id: ctx.params.id
		},
		data: {
			device_allowed: device_allowed
		}
	})
	return ctx.body = 200
}

export {
	change_password,
	change_email,
	change_is_public,
	change_newsletter,
	change_job,
	get_devices,
	update_devices
}
