import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const add_course = async (ctx: Context) => {
	const course = await prisma.education.create({
		data: {
			...ctx.request.body,
			user: { connect: { id: ctx.auth_id } }
		}
	})
	return ctx.body = { course }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const delete_course = async (ctx: Context) => {
	await prisma.education.delete({
		where: { id: ctx.params.id }
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_course = async (ctx: Context) => {
	const course = await prisma.education.update({
		where: { id: ctx.params.id },
		data: { ...ctx.request.body }
	})
	return ctx.body = { course }
}

export {
	add_course,
	delete_course,
	update_course
}
