import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create_sponsorship = async (ctx: Context) => {
	if (ctx.auth_role === 'sponsor') {
		await prisma.sponsorships.create({
			data: {
				user: { connect: { id: ctx.auth_id } }
			}
		})
		return ctx.body = 200
	} else {
		return ctx.throw(403)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fill_sponsorship = async (ctx: Context) => {
	if (ctx.auth_role === 'sponsor') {
		const { id } = ctx.params
		const { sponsor_link, sponsor_logo } = ctx.request.body
		const fill = await prisma.sponsorships.update({
			data: {
				sponsor_link: sponsor_link,
				sponsor_logo: sponsor_logo
			},
			where: {
				id: id
			}
		})
		return ctx.body = { fill }
	} else {
		return ctx.throw(403)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_sponsors = async (ctx: Context) => {
	const sponsors = await prisma.sponsorships.findMany()
	return ctx.body = { sponsors }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const user_sponsorship = async (ctx: Context) => {
	if (ctx.auth_role === 'sponsor') {
		const sponsor = await prisma.sponsorships.findOne({
			where: {
				user_id: ctx.auth_id
			},
			select: {
				id: true,
				sponsor_date: true,
				sponsor_logo: true,
				sponsor_link: true
			}
		})
		return ctx.body = { sponsor }
	} else {
		return ctx.throw(403)
	}
}


export {
	create_sponsorship,
	fill_sponsorship,
	get_sponsors,
	user_sponsorship
}
