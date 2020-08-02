import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import helmet from 'koa-helmet'
import compress from 'koa-compress'

import authRoutes from '@routes/auth'

const app = new Koa()

app.use(BodyParser())
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(authRoutes.routes())

export default app
