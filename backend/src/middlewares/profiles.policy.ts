import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const profiles_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		first_name: Joi.string().min(2).max(30).required(),
		last_name: Joi.string().min(2).max(30).required(),
		country: Joi.string().min(2).max(30).required(),
		city: Joi.string().min(2).max(30).required(),
		description: Joi.string().min(4).max(250).required(),
		job_title: Joi.string().min(4).max(20).required(),
		field: Joi.string().min(4).max(20).required(),
		contact: Joi.string().min(4).max(4).alphanum().required()
	})

	const { first_name, last_name, country, city, description, job_title, field, contact } = ctx.request.body
	const form_data = {
		first_name: first_name,
		last_name: last_name,
		country: country,
		city: city,
		description: description,
		job_title: job_title,
		field: field,
		contact: contact
	}
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'first_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'last_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'country':
			ctx.throw(400, 'Value not valid.')
			break
		case 'city':
			ctx.throw(400, 'Value not valid.')
			break
		case 'description':
			ctx.throw(400, 'Value not valid.')
			break
		case 'job_title':
			ctx.throw(400, 'Value not valid.')
			break
		case 'field':
			ctx.throw(400, 'Value not valid.')
			break
		case 'contact':
			ctx.throw(400, 'Value not valid.')
			break
		default:
			ctx.throw(400, 'Value not valid.')
			break
		}
	}
	next()
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const update_profile_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		first_name: Joi.string().min(2).max(30),
		last_name: Joi.string().min(2).max(30),
		country: Joi.string().min(2).max(30),
		city: Joi.string().min(2).max(30),
		description: Joi.string().min(4).max(250),
		job_title: Joi.string().min(4).max(20),
		field: Joi.string().min(4).max(20),
		contact: Joi.string().min(4).max(4).alphanum()
	})

	const { first_name, last_name, country, city, description, job_title, field, contact } = ctx.request.body
	const form_data = {
		first_name: first_name,
		last_name: last_name,
		country: country,
		city: city,
		description: description,
		job_title: job_title,
		field: field,
		contact: contact
	}
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'first_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'last_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'country':
			ctx.throw(400, 'Value not valid.')
			break
		case 'city':
			ctx.throw(400, 'Value not valid.')
			break
		case 'description':
			ctx.throw(400, 'Value not valid.')
			break
		case 'job_title':
			ctx.throw(400, 'Value not valid.')
			break
		case 'field':
			ctx.throw(400, 'Value not valid.')
			break
		case 'contact':
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
	profiles_policy,
	update_profile_policy
}
