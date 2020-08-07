import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sign_up = async (ctx: Context) => {
	const { email, password, role } = ctx.request.body
	const exists = await prisma.user.findOne({ where: { email } })
	if (exists) {
		ctx.throw(409, 'Account already exists.')
	}
	const hashed = bcrypt.hashSync(password, 10)
	const user = await prisma.user.create({ data: { email, password: hashed, role } })
	ctx.body = { user }
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
	const token = jwt.sign({ id: exists.id, role: exists.role }, process.env.JWT_SECRET)
	ctx.body = { token }
}

export {
	sign_up,
	sign_in
}
