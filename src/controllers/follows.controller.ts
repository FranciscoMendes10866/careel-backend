import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const follow = async (ctx: Context) => {
	const { user_id } = ctx.params
	await prisma.user.update({
		where: {
			id: ctx.auth_id
		},
		data: {
			following: {
				connect: {
					id: user_id
				}
			}
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const my_follows = async (ctx: Context) => {
	const follows = await prisma.user.findOne({
		where: {
			id: ctx.auth_id
		},
		select: {
			following: {
				select: {
					profile: {
						select: {
							first_name: true,
							last_name: true,
							profile_picture: true
						}
					}
				}
			}
		}
	})
	return ctx.body = { following: follows.following }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const my_followers = async (ctx: Context) => {
	const follows = await prisma.user.findOne({
		where: {
			id: ctx.auth_id
		},
		select: {
			followed_by: {
				select: {
					profile: {
						select: {
							first_name: true,
							last_name: true,
							profile_picture: true
						}
					}
				}
			}
		}
	})
	return ctx.body = { followers: follows.followed_by }
}



export {
	follow,
	my_follows,
	my_followers
}
