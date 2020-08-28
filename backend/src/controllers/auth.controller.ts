import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sign_up = async (ctx: Context) => {
	const { email, password, role } = ctx.request.body
	const exists = await prisma.user.findOne({ where: { email } })
	const isBanned = await prisma.banned.findMany({ where: { banned_email: email } })
	if (exists || isBanned.length > 0) {
		ctx.throw(409, 'Account already exists or was banned.')
	}
	const hashed = bcrypt.hashSync(password, 10)
	const user = await prisma.user.create({ data: { email, password: hashed, role } })
	return ctx.body = { user }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sign_in = async (ctx: Context) => {
	const { email, password } = ctx.request.body
	const exists = await prisma.user.findOne({ where: { email } })
	if (!exists) {
		ctx.throw(404, 'Account not found.')
	}
	const valid = await bcrypt.compare(password, exists.password)
	if (!valid) {
		ctx.throw(400, 'Password don\'t match.')
	}
	const token = jwt.sign({ id: exists.id, role: exists.role, admin: exists.admin, is_public: exists.is_public }, process.env.JWT_SECRET)
	return ctx.body =  {
		user: {
			is_public: exists.is_public
		},
		token
	}
}

export {
	sign_up,
	sign_in
}
