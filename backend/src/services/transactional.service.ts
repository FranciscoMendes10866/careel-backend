import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import mailJetConfig from '@configs/mailJet.config'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const forgotten_password = async (ctx: Context) => {
	/**
    * Gets the email and verifies if the email exists in the db
    **/
	const { email } = ctx.request.body
	const exists = await prisma.user.findOne({ where: { email } })
	if (!exists) {
		return ctx.throw(404)
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
	})
	ctx.body = 200
	/**
    * Then we will send the new password to the given email
    **/
	const send_email = mailJetConfig
		.post('send', {'version': 'v3.1'})
		.request({
			'Messages': [{
				'From': {
					'Email': 'avizinhadochico@gmail.com',
					'Name': 'Careel'
				},
				'To': {
					
					'Email': email,
					'Name': 'Dear user.'
					
				},
				'Variables': {
					'given_email': email,
					'new_password': password,
				},
				'TemplateLanguage': true,
				'Subject': 'Forgotten Password',
				'TextPart': 'Hi!',
				'HTMLPart':
                        '<h3>Dear user, as you asked, we generated a random password so that you can access the website.</h3><br/><br/>Your account details are the following:<br/><br/>Email: {{var:given_email}}<br/>Generated password: {{var:new_password}}<br/><br/>I hope you have a nice day! And don\'t forget to change your password on the website!'
			}]
		})
	send_email
		.then((result) => {
			console.log(result.body)
		})
		.catch((err) => {
			console.log(err.statusCode)
		})
}

export {
	forgotten_password
}
