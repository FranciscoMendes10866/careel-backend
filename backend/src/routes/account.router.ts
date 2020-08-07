import Router, { IRouterOptions } from 'koa-router'

import { change_email, change_is_public, change_password } from '@controllers/account.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/account' }
const router: Router = new Router(routerOptions)

router.put('/change_password', auth_guard, change_password)
router.put('/change_email', auth_guard, change_email)
router.put('/change_is_public', auth_guard, change_is_public)

export default router
