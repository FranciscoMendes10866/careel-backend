import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const add_ability = async (ctx: Context) => {
	const ability = await prisma.abilities.create({
		data: {
			...ctx.request.body,
			user: { connect: { id: ctx.auth_id } }
		}
	})
	return ctx.body = { ability }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const delete_ability = async (ctx: Context) => {
	await prisma.abilities.delete({
		where: { id: ctx.params.id }
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_ability = async (ctx: Context) => {
	const ability = await prisma.abilities.update({
		where: { id: ctx.prams.id },
		data: { ...ctx.request.body }
	})
	return ctx.body = { ability }
}

export {
	add_ability,
	delete_ability,
	update_ability
}
