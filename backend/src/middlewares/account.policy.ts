import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_password_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		password: Joi.string().min(8).max(30).alphanum().required()
	})

	const { password } = ctx.request.body
	const { error } = schema.validate({ password: password })

	if (error) {
		switch (error.details[0].context.key) {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_email_policy = async (ctx: Context, next: Next) => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_is_public_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		is_public: Joi.boolean().required()
	})

	const { is_public } = ctx.request.body
	const { error } = schema.validate({ is_public: is_public })

	if (error) {
		switch (error.details[0].context.key) {
		case 'is_public':
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
const update_newsletter_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		newsletter: Joi.boolean().required()
	})

	const { newsletter } = ctx.request.body
	const { error } = schema.validate({ newsletter: newsletter })

	if (error) {
		switch (error.details[0].context.key) {
		case 'newsletter':
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
	update_password_policy,
	update_email_policy,
	update_is_public_policy,
	update_newsletter_policy
}
