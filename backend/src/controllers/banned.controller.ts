import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

import transporter from '@configs/nodeMailer.config'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ban = async (ctx: Context) => {
	const { email, ban_reason } = ctx.request.body
	// deletes the user and gets the user id
	const user_data = await prisma.user.delete({
		where: {
			email: email
		},
		select: {
			id: true
		}
	})
	// deletes all experiences related to the user
	await prisma.experiences.deleteMany({
		where: {
			user_id: user_data.id
		}
	})
	// deletes all abilities related to the user
	await prisma.abilities.deleteMany({
		where: {
			user_id: user_data.id
		}
	})
	// deletes all languages related to the user
	await prisma.languages.deleteMany({
		where: {
			user_id: user_data.id
		}
	})
	// deletes all educations related to the user
	await prisma.education.deleteMany({
		where: {
			user_id: user_data.id
		}
	})
	// deletes all portfolios related to the user
	await prisma.portfolios.deleteMany({
		where: {
			user_id: user_data.id
		}
	})
	// deletes all apreciations related to the user
	await prisma.appreciations.deleteMany({
		where: {
			user_id: user_data.id,
			appreciated_id: user_data.id
		}
	})
	// deletes the profile related to the user
	await prisma.profile.deleteMany({
		where: {
			user_id: user_data.id
		}
	})
	// deletes the newsletter related to the user
	await prisma.newsletter.deleteMany({
		where: {
			user_id: user_data.id
		}
	})
	// gets the email and inserts it to the Banned table.
	await prisma.banned.create({
		data: {
			banned_email: email,
			ban_reason: ban_reason,
			user: { connect: { id: ctx.auth_id } }
		}
	}).then(({ banned_email, ban_reason, ban_date }) => {
		/**
		* Then we will send the new password to the given email
		**/
		const msg = {
			from: 'careel@tech.com',
			to: banned_email,
			subject: 'Banned from Careel.',
			text: `The user with the following email: ${banned_email} will be banned from the platform and will have all his data deleted. The reason is the following: ${ban_reason}. And was banned at: ${ban_date}.`
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		transporter.sendMail(msg, (error, info) => {
			if (error) {
				return ctx.throw(400, 'An error occored when sending the email.')
			}
		})
	}).catch((err) => {
		console.log(err)
	})
	return ctx.body = 200
}


export {
	ban
}
