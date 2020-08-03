// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const HttpException = async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500
		ctx.body = {
			message: err.message
		}
		ctx.app.emit('error', err, ctx)
	}
}

export default HttpException
