import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

import transporter from '@configs/nodeMailer.config'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const support = async (ctx: Context) => {
	const { email, subject, message } = ctx.request.body
	const msg = {
		from: email,
		to: 'careel@tech.com',
		subject: subject,
		text: message,
		html: message
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	transporter.sendMail(msg, (error, info) => {
		if (error) {
			return ctx.throw(400, 'An error occored when sending the email.')
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const user_support = async (ctx: Context) => {
	const { subject, message } = ctx.request.body
	await prisma.user.findOne({
		where: {
			id: ctx.auth_id
		},
		select: {
			email: true
		}
	}).then(({ email }) => {
		/**
		* Then we will send the email
		**/
		const msg = {
			from: email,
			to: 'careel@tech.com',
			subject: subject,
			text: message,
			html: message
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		transporter.sendMail(msg, (error, info) => {
			if (error) {
				return ctx.throw(400, 'An error occored when sending the email.')
			}
		})
	})
	return ctx.body = 200
}

export {
	support,
	user_support
}
