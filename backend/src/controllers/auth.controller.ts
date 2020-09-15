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
	const { email, password } = ctx.request.body
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
	const agent = ctx.header['user-agent']
	let platform
	let product
	// validates the user platform and product
	// validates if the request was made with Mac OS
	const macOS = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Macintosh')
	if (macOS) {
		platform = 'Mac'
	}
	// validates if the request was made with WindowsOS
	const WindowsOS = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Windows')
	if (WindowsOS) {
		platform = 'Windows PC'
	}
	// validates if the request was made with an iPhone
	const iPhone = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'iPhone')
	if (iPhone) {
		platform = 'iPhone'
	}
	// validates if the request was made with an Android
	const Android = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Android')
	if (Android) {
		platform = 'Android'
	}
	// validates if the request was made with an Ubuntu
	const Ubuntu = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Ubuntu')
	if (Ubuntu) {
		platform = 'Ubuntu'
	}
	// validates if the request was made with an Debian
	const Debian = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Debian')
	if (Debian) {
		platform = 'Debian'
	}
	// validates if the request was made with an Fedora
	const Fedora = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Fedora')
	if (Fedora) {
		platform = 'Fedora'
	}
	// validates if the request was made with an Kubuntu
	const Kubuntu = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Kubuntu')
	if (Kubuntu) {
		platform = 'Kubuntu'
	}
	// validates if the request was made with an Unknown
	const Unknown = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Unknown')
	if (Unknown) {
		platform = 'Unknown Device'
	}
	// validates if the request was made with an SMART TV
	const SMART = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'SMART')
	if (SMART) {
		platform = 'SMART TV'
	}
	// validates if the request was made with an Hisense TV
	const Hisense = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Hisense')
	if (Hisense) {
		platform = 'Hisense TV'
	}
	// validates if the request was made with an Linux
	const Linux = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Linux')
	if (Linux) {
		platform = 'Linux Based'
	}
	// product validation
	// validates if the request was made on Firefox Browser
	const firefox = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Firefox')
	if (firefox) {
		product = 'Firefox'
	}
	// validates if the request was made on Opera Browser
	const opera = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'OPR')
	if (opera) {
		product = 'Opera'
	}
	// validates if the request was made on Microsoft Edge
	const Edge = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Edg')
	if (Edge) {
		product = 'Microsoft Edge'
	}
	// validates if the request was made on Vivaldi
	const Vivaldi = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Vivaldi')
	if (Vivaldi) {
		product = 'Vivaldi'
	}
	// validates if the request was made on SamsungBrowser
	const SamsungBrowser = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'SamsungBrowser')
	if (SamsungBrowser) {
		product = 'Samsung Browser'
	}
	// validates if the request was made on TeslaBrowser
	const TeslaBrowser = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'TeslaBrowser')
	if (TeslaBrowser) {
		product = 'Tesla Browser'
	}
	// validates if the request was made on Chromium
	const Chromium = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Chromium')
	if (Chromium) {
		product = 'Chromium'
	}
	// validates if the request was made on Chrome Based Browsers
	const chromeBased = agent.split(/[\s,\?\,\./\(\;\)\:\!]+/).find(word => word === 'Chrome')
	if (chromeBased) {
		product = 'Chrome Based'
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
				device_platform: platform,
				device_product: product,
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
