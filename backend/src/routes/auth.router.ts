import Router from 'koa-router'

import { SignUp } from '@controllers/auth.controller'

const router: Router = new Router()

router.get('/', SignUp)

export default router
