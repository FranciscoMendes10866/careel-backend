// eslint-disable-next-line no-unused-vars
import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'

// eslint-disable-next-line no-unused-vars
import TokenPayload from '@interfaces/token.payload'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const auth_guard = async (ctx: Context, next: Next) => {
	const { authorization } = ctx.headers
	if (!authorization) {
		return ctx.throw(403)
	}
	const token = authorization.replace('Bearer', '').trim()
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET)
		const { id, role } = data as TokenPayload
		ctx.auth_id = id
		ctx.auth_role = role
		return next()
	} catch {
		return ctx.throw(403)
	}
}

export { auth_guard }
