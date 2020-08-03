import { Context } from 'koa'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SignUp = async (ctx: Context) => {
	ctx.body = { msg: 'Controller' }
}

export {
	SignUp
}
