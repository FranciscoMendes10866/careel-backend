import { Context, Next } from 'koa'
import Joi from 'joi'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const experiences_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		job_title: Joi.string().min(2).max(30).required(),
		company_name: Joi.string().min(2).max(30).required(),
		project_name: Joi.string().min(2).max(30).required(),
		project_link: Joi.string().min(2).max(30).required(),
		job_date: Joi.string().min(4).max(4).required()
	})

	const { job_title, company_name, project_name, project_link, job_date } = ctx.request.body
	const form_data = { 
		job_title: job_title, 
		company_name: company_name,
		project_name: project_name, 
		project_link: project_link,
		job_date: job_date
	}
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'job_title':
			ctx.throw(400, 'Value not valid.')
			break
		case 'company_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'project_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'project_link':
			ctx.throw(400, 'Value not valid.')
			break
		case 'job_date':
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
const update_experience_policy = async (ctx: Context, next: Next) => {
	const schema = Joi.object({
		job_title: Joi.string().min(2).max(30),
		company_name: Joi.string().min(2).max(30),
		project_name: Joi.string().min(2).max(30),
		project_link: Joi.string().min(2).max(30),
		job_date: Joi.string().min(4).max(4)
	})

	const { job_title, company_name, project_name, project_link, job_date } = ctx.request.body
	const form_data = { 
		job_title: job_title, 
		company_name: company_name,
		project_name: project_name, 
		project_link: project_link,
		job_date: job_date
	}
	const { error } = schema.validate(form_data)

	if (error) {
		switch (error.details[0].context.key) {
		case 'job_title':
			ctx.throw(400, 'Value not valid.')
			break
		case 'company_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'project_name':
			ctx.throw(400, 'Value not valid.')
			break
		case 'project_link':
			ctx.throw(400, 'Value not valid.')
			break
		case 'job_date':
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
	experiences_policy,
	update_experience_policy
}
