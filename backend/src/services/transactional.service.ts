import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

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
		return ctx.body = { email: email, password: password }
	}).catch((err) => {
		console.log(err)
	})
}

export {
	forgotten_password
}
