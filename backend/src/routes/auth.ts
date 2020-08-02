import Router from 'koa-router'

import { SignUp } from '@controllers/auth'

const router = new Router()

router.get('/', SignUp)

export default router
