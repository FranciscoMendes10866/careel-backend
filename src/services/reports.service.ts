import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

import transporter from '@configs/nodeMailer.config'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const report = async (ctx: Context) => {
	const { user_id } = ctx.params
	const { message } = ctx.request.body
	const reported_user = await prisma.user.findOne({
		where: {
			id: user_id
		},
		select: {
			email: true
		}
	})
	const sender_user = await prisma.user.findOne({
		where: {
			id: ctx.auth_id
		},
		select: {
			email: true
		}
	})
	/**
     * Then the email will be sent with the user's email
    **/
	const msg = {
		from: sender_user.email,
		to: 'careel@tech.com',
		subject: 'Report',
		text: `The user with the following email: ${reported_user.email}. ${message}`,
		html: `The user with the following email: <strong>${reported_user.email}</strong>. ${message}`
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	transporter.sendMail(msg, (error, info) => {
		if (error) {
			return ctx.throw(400, 'An error occored when sending the email.')
		}
		return ctx.body = 200
	})
}

export {
	report
}
