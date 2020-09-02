import Router, { IRouterOptions } from 'koa-router'

import { sign_in, sign_up, admin_sign_in } from '@controllers/auth.controller'
import { auth_policy_sign_in, auth_policy_sign_up } from '@middlewares/auth.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/auth' }
const router: Router = new Router(routerOptions)

router.post('/sign_up', auth_policy_sign_up , sign_up)
router.post('/sign_in', auth_policy_sign_in , sign_in)
router.post('/admin_sign_in', auth_policy_sign_in , admin_sign_in)

export default router
