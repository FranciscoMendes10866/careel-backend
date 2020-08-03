import { Context, Next } from 'koa'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const authorization = async (ctx: Context, next: Next) => {
	// Get auth header value
	const bearerHeader = ctx.header.authorization
	// Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		// Split at the space
		const bearer = bearerHeader.split(' ')
		// Get token from array
		const bearerToken = bearer[1]
		// Set the token
		ctx.token = bearerToken
		// Next middleware
		next()
	} else {
		// error
		ctx.throw(401, 'Protected resource, access denied.')
	}
}
  
export default authorization
