import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create_profile = async (ctx: Context) => {
	const { first_name,
		last_name,
		country,
		city,
		description,
		job_title,
		field,
		contact } = ctx.request.body
	const profile = await prisma.profile.create({
		data: {
			first_name: first_name,
			last_name: last_name,
			country: country,
			city: city,
			description: description,
			job_title: job_title,
			field: field,
			contact: contact,
			profile_picture: ctx.file.path,
			user: { connect: { id: ctx.auth_id } }
		}
	})
	return ctx.body = { profile }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_profile = async (ctx: Context) => {
	const profile = await prisma.profile.update({
		where: { id: ctx.params.id },
		data: { ...ctx.request.body }
	})
	return ctx.body = { profile }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_profile_picture = async (ctx: Context) => {
	const profile = await prisma.profile.update({
		where: { id: ctx.params.id },
		data: {
			profile_picture: ctx.files.path
		}
	})
	return ctx.body = { profile }
}

export {
	create_profile,
	update_profile,
	update_profile_picture
}
