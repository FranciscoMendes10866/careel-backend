import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create_sponsorship = async (ctx: Context) => {
	await prisma.sponsorships.create({
		data: {
			user: { connect: { id: ctx.auth_id } }
		}
	})
	ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fill_sponsorship = async (ctx: Context) => {
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
	ctx.body = { fill }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_sponsors = async (ctx: Context) => {
	const sponsors = await prisma.sponsorships.findMany()
	ctx.body = { sponsors }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const user_sponsorship = async (ctx: Context) => {
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
	ctx.body = { sponsor }
}


export {
	create_sponsorship,
	fill_sponsorship,
	get_sponsors,
	user_sponsorship
}
