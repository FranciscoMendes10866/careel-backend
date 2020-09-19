import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_stats = async (ctx: Context) => {
	// total number of users
	const total = await prisma.user.count()
	// total number of talents
	const number_talents = await prisma.user.count({
		where: {
			role: 'talent'
		}
	})
	// talents stats
	const talents_percentage = (number_talents / total) * 100
	const talents_approximate = talents_percentage.toFixed(1)
	// employers stats
	const number_employers = total - number_talents
	const employers_percentage = (number_employers / total) * 100
	const employers_approximate = employers_percentage.toFixed(1)
	// number of users that found a job
	const found_job = await prisma.user.count({
		where: {
			job: true,
			role: 'talent'
		}
	})
	// number of users that are looking for a job
	const finding_job = await prisma.user.count({
		where: {
			job: false,
			role: 'talent'
		}
	})
	// response - formated json
	return ctx.body = {
		stats: {
			users: {
				total: total
			},
			talents: {
				total: number_talents,
				percentage: talents_approximate
			},
			employers: {
				total: number_employers,
				percentage: employers_approximate
			},
			job: {
				found: found_job,
				finding: finding_job
			}
		}
	}
}


export {
	get_stats
}
