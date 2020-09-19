import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const add_portfolio = async (ctx: Context) => {
	const portfolio = await prisma.portfolios.create({
		data: {
			...ctx.request.body,
			user: { connect: { id: ctx.auth_id } }
		}
	})
	return ctx.body = { portfolio }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const delete_portfolio = async (ctx: Context) => {
	await prisma.portfolios.delete({
		where: { id: ctx.params.id }
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_portfolio = async (ctx: Context) => {
	const portfolio = await prisma.portfolios.update({
		where: { id: ctx.params.id },
		data: { ...ctx.request.body }
	})
	return ctx.body = { portfolio }
}

export {
	add_portfolio,
	delete_portfolio,
	update_portfolio
}
