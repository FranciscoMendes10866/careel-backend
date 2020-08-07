import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import KoaEx from 'koa-exception'

import authRoutes from '@routes/auth.router'
import accountRoutes from '@routes/account.router'

const app: Koa = new Koa()

app.use(KoaEx())
app.use(BodyParser())
app.use(cors())
app.use(helmet())
app.use(logger())
app.use(compress())
app.use(authRoutes.routes())
app.use(accountRoutes.routes())

export default app
