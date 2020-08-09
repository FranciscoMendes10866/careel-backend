import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const smtp_talents = async (ctx: Context) => {
	if (ctx.auth_admin == true) {
		const talents = await prisma.user.findMany({
			where: {
				role: 'talent',
				newsletter: {
					is_subscribed: true
				}
			},
			select: {
				email: true
			}
		})
		return ctx.body = { talents }
	}
	return ctx.throw(403)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const smtp_employers = async (ctx: Context) => {
	if (ctx.auth_admin == true) {
		const employers = await prisma.user.findMany({
			where: {
				role: 'employer',
				newsletter: {
					is_subscribed: true
				}
			},
			select: {
				email: true
			}
		})
		return ctx.body = { employers }
	}
	return ctx.throw(403)
}

export {
	smtp_talents,
	smtp_employers
}
