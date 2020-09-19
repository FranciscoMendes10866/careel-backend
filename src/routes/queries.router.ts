import Router, { IRouterOptions } from 'koa-router'

import { get_user, get_by_field, get_by_city } from '@controllers/queries.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/queries' }
const router: Router = new Router(routerOptions)

router.post('/select_by_field', auth_guard, get_by_field)
router.get('/:id', auth_guard, get_user)
router.post('/select_by_city', auth_guard, get_by_city)

export default router
