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
			sender_id: ctx.auth_id
		}
	})
	await prisma.messages.deleteMany({
		where: {
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
	// we are going to get all users that the sender is following
	const sender = await prisma.user.findOne({
		where: {
			id: ctx.auth_id
		},
		select: {
			id: true,
			following: {
				select: {
					id: true
				}
			}
		}
	})
	// we are going to get all users that the receiver is following
	const receiver = await prisma.user.findOne({
		where: {
			id: user_id
		},
		select: {
			id: true,
			following: {
				select: {
					id: true
				}
			}
		}
	})
	// both users id's
	const sender_id = sender.id
	const receiver_id = receiver.id
	// convert strins to an array
	const arr1 = []
	arr1.push(sender_id)
	const arr2 = []
	arr2.push(receiver_id)
	// I will reformat the array, just to have an item as the id instead of an object
	const sender_following = sender.following.map(obj => obj.id)
	const receiver_following = receiver.following.map(obj => obj.id)
	// validates if the users follow each other
	const sender_val = arr1.some(v => receiver_following.includes(v))
	const receiver_val = arr2.some(v => sender_following.includes(v))
	// if they follow each other, the sender can send a message, otherwise the sender will get an error
	if (sender_val === true && receiver_val === true) {
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
