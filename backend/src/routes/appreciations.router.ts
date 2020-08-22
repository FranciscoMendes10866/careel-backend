import Router, { IRouterOptions } from 'koa-router'

import { apreciate, count_appreciations, remove_appreciation, unapreciate } from '@controllers/appreciations.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/appreciations' }
const router: Router = new Router(routerOptions)

router.get('/', auth_guard, count_appreciations)
router.delete('/:id', auth_guard, remove_appreciation)
router.post('/:user_id', auth_guard, apreciate)
router.delete('/:user_id', auth_guard, unapreciate)

export default router
