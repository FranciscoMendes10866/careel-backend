import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const education_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		course_name: Joi.string().min(2).max(30).required(),
		course_level: Joi.string().min(2).max(30).required(),
		course_college: Joi.string().min(2).max(30).required(),
		course_date: Joi.string().min(2).max(30).required()
	})

	const { course_name, course_level, course_college, course_date } = ctx.request.body
	const form_data = { 
		course_name: course_name, 
		course_level: course_level,
		course_college: course_college, 
		course_date: course_date 
	}
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'course_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'course_level':
			ctx.throw(400, 'Value not valid.')
			break
		case 'course_college':
			ctx.throw(400, 'Value not valid.')
			break
		case 'course_date':
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
const update_education_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		course_name: Joi.string().min(2).max(30),
		course_level: Joi.string().min(2).max(30),
		course_college: Joi.string().min(2).max(30),
		course_date: Joi.string().min(2).max(30)
	})

	const { course_name, course_level, course_college, course_date } = ctx.request.body
	const form_data = { 
		course_name: course_name, 
		course_level: course_level,
		course_college: course_college, 
		course_date: course_date 
	}
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'course_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'course_level':
			ctx.throw(400, 'Value not valid.')
			break
		case 'course_college':
			ctx.throw(400, 'Value not valid.')
			break
		case 'course_date':
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
	education_policy,
	update_education_policy
}
