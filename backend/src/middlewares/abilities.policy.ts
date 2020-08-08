import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const abilities_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		ability: Joi.string().min(2).max(30).required()
	})

	const { ability } = ctx.request.body
	const { error } = schema.validate({ ability: ability })

	if (error) {
		switch (error.details[0].context.key) {
		case 'ability':
			ctx.throw(400, 'Value not valid.')
			break
		default: 
			ctx.throw(400, 'Value not valid.')
			break
		}
	}
	return next()
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_ability_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		ability: Joi.string().min(2).max(30)
	})

	const { ability } = ctx.request.body
	const { error } = schema.validate({ ability: ability })

	if (error) {
		switch (error.details[0].context.key) {
		case 'ability':
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
	abilities_policy,
	update_ability_policy
}
