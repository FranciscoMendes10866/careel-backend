import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const is_subscribed_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		is_subscribed: Joi.boolean().required()
	})

	const { is_subscribed } = ctx.request.body
	const { error } = schema.validate({ is_subscribed: is_subscribed })

	if (error) {
		switch (error.details[0].context.key) {
		case 'is_subscribed':
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
	is_subscribed_policy
}
