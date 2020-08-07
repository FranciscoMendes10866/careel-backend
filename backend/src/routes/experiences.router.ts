import Router, { IRouterOptions } from 'koa-router'

import { add_experience, delete_experience, update_experience } from '@controllers/experiences.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/experiences' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, add_experience)
router.delete('/:id', auth_guard, delete_experience)
router.patch('/:id', auth_guard, update_experience)

export default router
