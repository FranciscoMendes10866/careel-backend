import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const auth_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(30).alphanum().required()
	})

	const { email, password } = ctx.request.body
	const form_data = { email: email, password: password }
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'email':
			ctx.throw(400, 'Value not valid.')
			break
		case 'password':
			ctx.throw(400, 'Value not valid.')
			break
		default: 
			ctx.throw(400, 'Value not valid.')
			break
		}
	}
	next()
}


export {
	auth_policy
}
