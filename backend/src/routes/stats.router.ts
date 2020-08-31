import Router, { IRouterOptions } from 'koa-router'

import { get_number_users, get_number_talents, get_number_employers, get_number_found_job } from '@controllers/stats.controller'

const routerOptions: IRouterOptions = { prefix: '/api/v1/stats' }
const router: Router = new Router(routerOptions)

router.get('/', get_number_users)
router.get('/talents', get_number_talents)
router.get('/employers', get_number_employers)
router.get('/found_job', get_number_found_job)

export default router
