import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const add_language = async (ctx: Context) => {
	const language = await prisma.languages.create({
		data: {
			...ctx.request.body,
			user: { connect: { id: ctx.auth_id } }
		}
	})
	return ctx.body = { language }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const delete_language = async (ctx: Context) => {
	await prisma.languages.delete({
		where: { id: ctx.params.id }
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_language = async (ctx: Context) => {
	const language = await prisma.languages.update({
		where: { id: ctx.params.id },
		data: { ...ctx.request.body }
	})
	return ctx.body = { language }
}

export {
	add_language,
	delete_language,
	update_language
}