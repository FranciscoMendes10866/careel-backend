import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const add_experience = async (ctx: Context) => {
	const experience = await prisma.experiences.create({
		data: {
			...ctx.request.body,
			user: { connect: { id: ctx.auth_id } }
		}
	})
	return ctx.body = { experience }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const delete_experience = async (ctx: Context) => {
	await prisma.experiences.delete({
		where: { id: ctx.params.id }
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_experience = async (ctx: Context) => {
	const experience = await prisma.experiences.update({
		where: { id: ctx.params.id },
		data: { ...ctx.request.body }
	})
	return ctx.body = { experience }
}


export {
	add_experience,
	delete_experience,
	update_experience
}
