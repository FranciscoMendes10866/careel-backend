import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import logger from 'koa-logger'
import KoaEx from 'koa-exception'

import authRoutes from '@routes/auth.router'
import accountRoutes from '@routes/account.router'
import educationRoutes from '@routes/education.router'
import abilitiesRoutes from '@routes/abilities.router'
import experiencesRoutes from '@routes/experiences.router'
import languagesRoutes from '@routes/languages.router'
import portfoliosRoutes from '@routes/portolios.router'
import profileRoutes from '@routes/profile.router'

const app: Koa = new Koa()

app.use(KoaEx())
app.use(BodyParser())
app.use(cors())
app.use(helmet())
app.use(logger())
app.use(compress())
app.use(authRoutes.routes())
app.use(accountRoutes.routes())
app.use(educationRoutes.routes())
app.use(abilitiesRoutes.routes())
app.use(experiencesRoutes.routes())
app.use(languagesRoutes.routes())
app.use(portfoliosRoutes.routes())
app.use(profileRoutes.routes())

export default app
