import Router from 'koa-router'

import { SignUp } from '@controllers/auth.controller'
import Guard from '@guards/authorization.guard'

const router = new Router()

router.get('/', Guard, SignUp)

export default router
