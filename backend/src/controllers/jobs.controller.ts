import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create_record = async (ctx: Context) => {
	const { found_job } = ctx.request.body
	await prisma.job.create({
		data: {
			found_job: found_job,
			user: { connect: { id: ctx.auth_id} }
		}
	})
	return ctx.body = 201
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const set_to_false = async (ctx: Context) => {
	const { id } = ctx.params
	await prisma.job.update({
		where: {
			id: id
		},
		data: {
			found_job: false
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const set_to_true = async (ctx: Context) => {
	const { id } = ctx.params
	await prisma.job.update({
		where: {
			id: id
		},
		data: {
			found_job: true
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const status = async (ctx: Context) => {
	const job_status = await prisma.job.findOne({
		where: {
			user_id: ctx.auth_id
		},
		select: {
			found_job: true
		}
	})
	return ctx.body = { job_status }
}

export {
	set_to_false,
	set_to_true,
	create_record,
	status
}
