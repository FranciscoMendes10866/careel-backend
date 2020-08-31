import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const auth_policy_sign_up = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(30).alphanum().required(),
		role: Joi.string().required(),
		terms_conditions: Joi.boolean().required()
	})

	const { email, password, role, terms_conditions } = ctx.request.body
	const form_data = { email: email, password: password, role: role, terms_conditions: terms_conditions }
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'email':
			ctx.throw(400, 'Value not valid.')
			break
		case 'password':
			ctx.throw(400, 'Value not valid.')
			break
		case 'role':
			ctx.throw(400, 'Value not valid.')
			break
		case 'terms_conditions':
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
const auth_policy_sign_in = async (ctx: Context, next: Next) => {
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
	return next()
}


export {
	auth_policy_sign_up,
	auth_policy_sign_in
}
