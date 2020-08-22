import Router, { IRouterOptions } from 'koa-router'

import { ban } from '@controllers/banned.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/bans' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, ban)

export default router
