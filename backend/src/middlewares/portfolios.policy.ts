import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const portfolios_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		website_name: Joi.string().min(2).max(30).required(),
		website_link: Joi.string().min(2).max(30).required()
	})

	const { website_name, website_link } = ctx.request.body
	const form_data = { website_name: website_name, website_link: website_link }
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'website_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'website_link':
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
const update_portfolio_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		website_name: Joi.string().min(2).max(30),
		website_link: Joi.string().min(2).max(30)
	})

	const { website_name, website_link } = ctx.request.body
	const form_data = { website_name: website_name, website_link: website_link }
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'website_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'website_link':
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
	portfolios_policy,
	update_portfolio_policy
}
