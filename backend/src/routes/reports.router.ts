import Router, { IRouterOptions } from 'koa-router'

import { report } from '@services/reports.service'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/reports' }
const router: Router = new Router(routerOptions)

router.post('/:user_id', auth_guard, report)

export default router
