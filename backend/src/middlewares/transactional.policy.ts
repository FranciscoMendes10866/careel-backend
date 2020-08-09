import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const transactional_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		email: Joi.string().email().required()
	})

	const { email } = ctx.request.body
	const { error } = schema.validate({ email: email })

	if (error) {
		switch (error.details[0].context.key) {
		case 'email':
			ctx.throw(400, 'Value not valid.')
			break
		default: 
			ctx.throw(400, 'Value not valid.')
			break
		}
	}
	return next()
}


export {
	transactional_policy
}
