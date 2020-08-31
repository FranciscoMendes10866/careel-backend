import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_number_users = async (ctx: Context) => {
	const total = await prisma.user.count()
	return ctx.body = { users: { total } }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_number_talents = async (ctx: Context) => {
	const total = await prisma.user.count()
	const number_talents = await prisma.user.count({
		where: {
			role: 'talent'
		}
	})
	const percentage = (number_talents / total) * 100
	const approximate = percentage.toFixed(1)
	return ctx.body = { talents: { total: total, percentage: approximate } }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_number_employers = async (ctx: Context) => {
	const total = await prisma.user.count()
	const number_employers = await prisma.user.count({
		where: {
			role: 'employer'
		}
	})
	const percentage = (number_employers / total) * 100
	const approximate = percentage.toFixed(1)
	return ctx.body = { employers: { total: total, percentage: approximate } }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_number_found_job = async (ctx: Context) => {
	const total = await prisma.job.count({
		where: {
			found_job: true
		}
	})
	return ctx.body = { found_job: { total } }
}

export {
	get_number_users,
	get_number_talents,
	get_number_employers,
	get_number_found_job
}
