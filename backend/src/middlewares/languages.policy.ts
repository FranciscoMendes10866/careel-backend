import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const languages_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		language: Joi.string().min(2).max(30).required()
	})

	const { language } = ctx.request.body
	const { error } = schema.validate({ language: language })

	if (error) {
		switch (error.details[0].context.key) {
		case 'language':
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
const update_language_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		language: Joi.string().min(2).max(30)
	})

	const { language } = ctx.request.body
	const { error } = schema.validate({ language: language })

	if (error) {
		switch (error.details[0].context.key) {
		case 'language':
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
	languages_policy,
	update_language_policy
}
