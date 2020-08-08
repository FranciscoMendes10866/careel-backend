import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_user = async (ctx: Context) => {
	const query = await prisma.user.findOne({
		where: {
			id: ctx.params.id
		},
		select: {
			id: true,
			education: {
				select: {
					id: true,
					course_name: true,
					course_level: true,
					course_date: true
				}
			},
			abilities: {
				select: {
					id: true,
					ability: true
				}
			},
			languages: {
				select: {
					id: true,
					language: true
				}
			},
			experiences: {
				select: {
					id: true,
					job_title: true,
					company_name: true,
					project_name: true,
					project_link: true
				}
			},
			portfolios: {
				select: {
					id: true,
					website_name: true,
					website_link: true
				}
			},
			profile: {
				select: {
					first_name: true,
					last_name: true,
					country: true,
					city: true,
					description: true,
					contact: true,
					job_title: true,
					profile_picture: true
				}
			}
		},
	})
	return ctx.body = { query }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_all = async (ctx: Context) => {
	if (ctx.auth_role == 'talent') {
		const query = await prisma.user.findMany({
			where: {
				is_public: true,
				role: 'employer'
			},
			select: {
				id: true,
				profile: {
					select: {
						first_name: true,
						last_name: true,
						profile_picture: true,
						job_title: true
					}
				}
			}
		})
		return ctx.body = { query }
	}
	const query = await prisma.user.findMany({
		where: {
			is_public: true,
			role: 'talent'
		},
		select: {
			id: true,
			profile: {
				select: {
					first_name: true,
					last_name: true,
					profile_picture: true,
					job_title: true
				}
			}
		}
	})
	return ctx.body = { query }
}

export {
	get_user,
	get_all
}
