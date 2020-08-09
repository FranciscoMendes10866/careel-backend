import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const subscribe_newsletter = async (ctx: Context) => {
	const { is_subscribed } = ctx.request.body
	const newsletter = await prisma.newsletter.create({
		data: {
			is_subscribed: is_subscribed,
			user: { connect: { id: ctx.auth_id } }
		},
		select: {
			id: true,
			is_subscribed: true
		}
	})
	return ctx.body = { newsletter }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const newsletter_manager = async (ctx: Context) => {
	const { id } = ctx.params
	const { is_subscribed } = ctx.request.body
	const newsletter = await prisma.newsletter.update({
		where: {
			id: id
		},
		data: {
			is_subscribed: is_subscribed
		},
		select: {
			id: true,
			is_subscribed: true
		}
	})
	return ctx.body = { newsletter }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const is_user_subscribed = async (ctx: Context) => {
	const newsletter = await prisma.newsletter.findOne({
		where: {
			user_id: ctx.auth_id
		},
		select: {
			is_subscribed: true
		}
	})
	return ctx.body = { newsletter }
}

export {
	subscribe_newsletter,
	newsletter_manager,
	is_user_subscribed
}
