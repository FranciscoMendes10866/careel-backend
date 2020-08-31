import Router, { IRouterOptions } from 'koa-router'

import { get_number_users, get_number_talents, get_number_employers } from '@controllers/stats.controller'

const routerOptions: IRouterOptions = { prefix: '/api/v1/stats' }
const router: Router = new Router(routerOptions)

router.get('/number', get_number_users)
router.get('/number_talents', get_number_talents)
router.get('/number_employers', get_number_employers)

export default router
