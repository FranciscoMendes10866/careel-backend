import { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const prisma = new PrismaClient()
const iv = process.env.CRYPTO_IV
const key = process.env.CRYPTO_KEY

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sign_up = async (ctx: Context) => {
	const { email, password, role, terms_conditions } = ctx.request.body
	const exists = await prisma.user.findOne({ where: { email } })
	const isBanned = await prisma.banned.findMany({ where: { banned_email: email } })
	if (exists || isBanned.length > 0) {
		return ctx.throw(409, 'Account already exists or was banned.')
	}
	if (terms_conditions == false || terms_conditions == null) {
		return ctx.throw(400, 'Terms and Conditions not accepted.')
	}
	const hashed = bcrypt.hashSync(password, 10)
	await prisma.user.create({ data: { email, password: hashed, role, terms_conditions } })
	return ctx.body = 200
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sign_in = async (ctx: Context) => {
	// gets the email and the password from the user input
	const { email, password, device_platform, device_product, device_type } = ctx.request.body
	// verifies if the given email exists in the database
	// if it doesn't, the user will get an error
	const exists = await prisma.user.findOne({
		where: {
			email
		},
		select: {
			id: true,
			password: true,
			is_public: true,
			role: true,
			job: true,
			newsletter: true,
			admin: true,
			security: {
				select: {
					device_ip: true
				}
			}
		}
	})
	if (!exists) {
		return ctx.throw(404, 'Account not found.')
	}
	// if the user does exist, this time we will validate the given password
	// if the passoword dosn't match, the user will get an error
	const valid = await bcrypt.compare(password, exists.password)
	if (!valid) {
		return ctx.throw(400, 'Password don\'t match.')
	}
	// gets the user's system info
	let ip = ctx.ip
	if (ip.substr(0, 7) == '::ffff:') {
		ip = ip.substr(7)
	}
	// decryption constants
	const decrypted_devices = []
	const current_device = []
	// gets the ver array and reformats it
	const all_devices = exists.security.map(obj => obj.device_ip)
	// loops trhough the entire array to decrypt all ips
	all_devices.forEach((item) => {
		const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
		let decrypted = decipher.update(item, 'hex', 'utf-8')
		decrypted += decipher.final('utf-8')
		decrypted_devices.push(decrypted)
	})
	// pushes the current ip to an array
	// so that we can verify if it exists
	current_device.push(ip)
	// validation
	const validates = current_device.some((v) => decrypted_devices.includes(v))
	// if the user doesn't have a registered device
	if (validates == false) {
		// gets the ip value and encrypts it
		const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
		let encrypted = cipher.update(ip, 'utf-8', 'hex')
		encrypted += cipher.final('hex')
		// creates the new device
		await prisma.security.create({
			data: {
				device_ip: encrypted,
				device_platform: device_platform,
				device_product: device_product,
				device_type: device_type,
				user: { connect: { email } }
			}
		})
		// then loggs in
		const token = jwt.sign({ id: exists.id, role: exists.role, admin: exists.admin, is_public: exists.is_public }, process.env.JWT_SECRET)
		return ctx.body = {
			user: {
				is_public: exists.is_public,
				role: exists.role,
				is_admin: exists.admin,
				newsletter: exists.newsletter,
				job: exists.job,
			},
			token
		}
	} else if (validates == true) {
		const token = jwt.sign({ id: exists.id, role: exists.role, admin: exists.admin, is_public: exists.is_public }, process.env.JWT_SECRET)
		return ctx.body = {
			user: {
				is_public: exists.is_public,
				role: exists.role,
				is_admin: exists.admin,
				newsletter: exists.newsletter,
				job: exists.job,
			},
			token
		}
	}
}

export {
	sign_up,
	sign_in
}
