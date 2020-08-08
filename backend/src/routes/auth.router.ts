import Router, { IRouterOptions } from 'koa-router'

import { sign_in, sign_up } from '@controllers/auth.controller'
import { auth_policy } from '@middlewares/auth.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/auth' }
const router: Router = new Router(routerOptions)

router.post('/sign_up', auth_policy , sign_up)
router.post('/sign_in', auth_policy , sign_in)

export default router
