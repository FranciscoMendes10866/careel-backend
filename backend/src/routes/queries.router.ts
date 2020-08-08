import Router, { IRouterOptions } from 'koa-router'

import { get_user, get_all } from '@controllers/queries.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/queries' }
const router: Router = new Router(routerOptions)

router.get('/', auth_guard, get_all)
router.get('/:id', auth_guard, get_user)

export default router
