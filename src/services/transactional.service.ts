import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import transporter from '@configs/nodeMailer.config'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const forgotten_password = async (ctx: Context) => {
	/**
    * Gets the email and verifies if the email exists in the db
    **/
	const { email } = ctx.request.body
	const exists = await prisma.user.findOne({ where: { email } })
	if (!exists) {
		return ctx.throw(404, 'Email doesn\'t exist.')
	}
	/**
    * If it does, the backend will generate a random password
    **/
	const random = Math.floor(Math.random() * 100000000000) + 1000000000
	const password = random.toString()
	/**
    * Then the password will be encrypted and updated in the db
    **/
	const hashed = bcrypt.hashSync(password, 10)
	await prisma.user.update({
		where: {
			email: email
		},
		data: {
			password: hashed
		}
	}).then(() => {
		/**
		* Then we will send the new password to the given email
		**/
		const msg = {
			from: 'careel@tech.com',
			to: email,
			subject: 'Reset Password',
			text: `Your email ${email} and your new password ${password}.`,
			html: `Your email <strong>${email}</strong> and your new password <strong>${password}</strong>.`
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		transporter.sendMail(msg, (error, info) => {
			if (error) {
				return ctx.throw(400, 'An error occored when sending the email.')
			}
			return ctx.body = 200
		})
	}).catch((err) => {
		console.log(err)
	})
}

export {
	forgotten_password
}
