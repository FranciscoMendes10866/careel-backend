import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import KoaEx from 'koa-exception'
import KoaLimiter from 'koa2-ratelimit'

import authRoutes from '@routes/auth.router'
import accountRoutes from '@routes/account.router'
import educationRoutes from '@routes/education.router'
import abilitiesRoutes from '@routes/abilities.router'
import experiencesRoutes from '@routes/experiences.router'
import languagesRoutes from '@routes/languages.router'
import portfoliosRoutes from '@routes/portolios.router'
import profileRoutes from '@routes/profile.router'
import queriesRoutes from '@routes/queries.router'
import transactionalRoutes from '@routes/transactional.router'
import smtpRoutes from '@routes/smtp.router'
import reportsRoutes from '@routes/reports.router'
import banRoutes from '@routes/banned.router'
import supportRoutes from '@routes/support.router'
import messagesRoutes from '@routes/messages.router'
import followRoutes from '@routes/follows.router'
import statsRoutes from '@routes/stats.router'

const app: Koa = new Koa()
const RateLimit = KoaLimiter.RateLimit
const limiter = RateLimit.middleware({
	interval: { min: 15 }, 
	max: 100,
	message: 'Sometimes You Just Have to Slow Down.'
})
const corsOptions = { origin: process.env.CORS_WB }

app.use(KoaEx())
app.use(BodyParser())
app.use(cors(corsOptions))
app.use(helmet())
app.use(logger())
app.use(limiter)
app.use(compress())
app.use(authRoutes.routes())
app.use(accountRoutes.routes())
app.use(educationRoutes.routes())
app.use(abilitiesRoutes.routes())
app.use(experiencesRoutes.routes())
app.use(languagesRoutes.routes())
app.use(portfoliosRoutes.routes())
app.use(profileRoutes.routes())
app.use(queriesRoutes.routes())
app.use(transactionalRoutes.routes())
app.use(smtpRoutes.routes())
app.use(reportsRoutes.routes())
app.use(banRoutes.routes())
app.use(supportRoutes.routes())
app.use(messagesRoutes.routes())
app.use(followRoutes.routes())
app.use(statsRoutes.routes())

export default app
