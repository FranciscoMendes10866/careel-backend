import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import responseTime from 'koa-response-time'

import authRoutes from '@routes/auth.router'
import HttpException from '@exceptions/http-exception.filter'

const app = new Koa()

app.use(HttpException)
app.use(responseTime({ hrtime: true }))
app.use(BodyParser())
app.use(cors())
app.use(helmet())
app.use(logger())
app.use(compress())
app.use(authRoutes.routes())

export default app
