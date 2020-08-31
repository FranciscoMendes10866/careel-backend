import Router, { IRouterOptions } from 'koa-router'

import { create_record, set_to_false, set_to_true, status } from '@controllers/jobs.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/jobs' }
const router: Router = new Router(routerOptions)

router.post('/create_record', auth_guard, create_record)
router.put('/set_false/:id', auth_guard, set_to_false)
router.put('/set_true/:id', auth_guard, set_to_true)
router.get('/', auth_guard, status)

export default router
