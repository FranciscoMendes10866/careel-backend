import Router, { IRouterOptions } from 'koa-router'

import { support, user_support } from '@services/support.service'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/support' }
const router: Router = new Router(routerOptions)

router.post('/', support)
router.post('/user_support', auth_guard, user_support)

export default router
