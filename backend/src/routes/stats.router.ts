import Router, { IRouterOptions } from 'koa-router'

import { get_stats } from '@controllers/stats.controller'

const routerOptions: IRouterOptions = { prefix: '/api/v1/stats' }
const router: Router = new Router(routerOptions)

router.get('/', get_stats)

export default router
