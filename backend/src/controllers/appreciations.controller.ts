import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const count_appreciations = async (ctx: Context) => {
	const counted = await prisma.appreciations.count({
		where: {
			appreciated_id: ctx.auth_id
		}
	})
	return ctx.body = { counted }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const apreciate = async (ctx: Context) => {
	const { user_id } = ctx.params
	await prisma.appreciations.create({
		data: {
			appreciated_id: user_id,
			user: { connect: { id: ctx.auth_id } }
		}
	})
	const liked = await prisma.appreciations.findMany({
		where: {
			user_id: ctx.auth_id
		},
		select: {
			appreciated_id: true
		}
	})
	const appreciated_users = liked.map(obj => obj.appreciated_id)
	return ctx.body = { appreciated_users }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const unapreciate = async (ctx: Context) => {
	const { user_id } = ctx.params
	const clicked_user = await prisma.appreciations.findMany({
		where: {
			appreciated_id: user_id,
			user_id: ctx.auth_id
		},
		select: {
			id: true
		}
	})
	await prisma.appreciations.delete({
		where: {
			id: clicked_user[0].id
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const remove_appreciation = async (ctx: Context) => {
	await prisma.appreciations.delete({
		where: { id: ctx.params.id }
	})
	return ctx.body = 200
}

export {
	count_appreciations,
	apreciate,
	remove_appreciation,
	unapreciate
}
