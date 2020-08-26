import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const delete_message = async (ctx: Context) => {
	const { id } = ctx.params
	await prisma.messages.delete({
		where: {
			id: id
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const delete_all_messages = async (ctx: Context) => {
	await prisma.messages.deleteMany({
		where: {
			sender_id: ctx.auth_id,
			receiver_id: ctx.auth_id
		}
	})
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const send_message = async (ctx: Context) => {
	// gets the id (of the user_id profile) of the user that the sender wants to send a message
	const { user_id } = ctx.params
	// gets the message that the sender wants to send
	const {  message } = ctx.request.body
	// here we are defining the "validation" booleans
	let is_sender_following: boolean
	let is_receiver_following: boolean
	// we are going to verify if the sender already follows the person he wants to send a message
	const sender_follows = await prisma.appreciations.findMany({
		where: {
			user_id: ctx.auth_id,
			appreciated_id: user_id
		}
	})
	// if he does, we set the "validation" boolean to true, if not, sets it to false
	if (sender_follows) {
		is_sender_following = true
	} else {
		is_sender_following = false
	}
	// now we are going to verify if the receiver already follow the sender
	const receiver_follows = await prisma.appreciations.findMany({
		where: {
			user_id: user_id,
			appreciated_id: ctx.auth_id
		}
	})
	// if he does, we set the "validation" boolean to true, if not, sets it to false
	if (receiver_follows) {
		is_receiver_following = true
	} else {
		is_receiver_following = false
	}
	// now we verify, if they follow each other, the sender can send a message, otherwise the sender will get an error
	if (is_sender_following == true && is_receiver_following == true) {
		await prisma.messages.create({
			data: {
				message: message,
				receiver_id: user_id,
				sender: { connect: { id: ctx.auth_id } }
			}
		})
		return ctx.body = 200
	} else {
		ctx.throw(400, 'Users do not follow each other.')
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get_all_messages = async (ctx: Context) => {
	const messages = await prisma.messages.findMany({
		where: {
			receiver_id: ctx.auth_id
		},
		select: {
			sender_id: true,
			message: true
		}
	})
	return ctx.body = { messages }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reply_message = async (ctx: Context) => {
	const { sender_id } = ctx.params
	const { message } = ctx.request.body
	await prisma.messages.create({
		data: {
			message: message,
			receiver_id: sender_id,
			sender: { connect: { id: ctx.auth_id } }
		}
	})
	return ctx.body = 200
}

export {
	delete_message,
	delete_all_messages,
	send_message,
	get_all_messages,
	reply_message
}
