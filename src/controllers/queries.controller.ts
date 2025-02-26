import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_user = async (ctx: Context) => {
	const { id } = ctx.params
	const query = await prisma.user.findOne({
		where: {
			id: id
		},
		select: {
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
			},
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
			}
		},
	})
	return ctx.body = { query }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_by_field = async (ctx: Context) => {
	const { field } = ctx.request.body
	if (ctx.auth_role == 'talent' && ctx.auth_is_public == true) {
		const query = await prisma.profile.findMany({
			select: {
				user_id: true,
				first_name: true,
				last_name: true,
				job_title: true,
				city: true,
				profile_picture: true
			},
			where : {
				field: field,
				user: {
					is_public: true,
					role: 'employer'
				}
			}
		})
		return ctx.body = { query }
	} else if (ctx.auth_role == 'employer' && ctx.auth_is_public == true) {
		const query = await prisma.profile.findMany({
			select: {
				user_id: true,
				first_name: true,
				last_name: true,
				job_title: true,
				city: true,
				profile_picture: true
			},
			where : {
				field: field,
				user: {
					is_public: true,
					role: 'talent'
				}
			}
		})
		return ctx.body = { query }
	}
	return ctx.throw(400)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_by_city = async (ctx: Context) => {
	const { city } = ctx.request.body
	if (ctx.auth_role == 'employer' && ctx.auth_is_public == true) {
		const query = await prisma.profile.findMany({
			select: {
				user_id: true,
				first_name: true,
				last_name: true,
				job_title: true,
				field: true,
				profile_picture: true,
			},
			where: { 
				city: city, 
				user: { 
					is_public: true, 
					role: 'talent' 
				} 
			}
		})
		return ctx.body = { query }
	} else if (ctx.auth_role == 'talent' && ctx.auth_is_public == true) {
		const query = await prisma.profile.findMany({
			select: {
				user_id: true,
				first_name: true,
				last_name: true,
				job_title: true,
				field: true,
				profile_picture: true,
			},
			where: { 
				city: city, 
				user: { 
					is_public: true, 
					role: 'employer' 
				} 
			}
		})
		return ctx.body = { query }
	}
	return ctx.throw(400)
}

export {
	get_user,
	get_by_field,
	get_by_city
}
