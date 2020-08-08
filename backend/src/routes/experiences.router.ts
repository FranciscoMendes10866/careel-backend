import Router, { IRouterOptions } from 'koa-router'

import { add_experience, delete_experience, update_experience } from '@controllers/experiences.controller'
import { auth_guard } from '@guards/authorization.guard'
import { experiences_policy, update_experience_policy } from '@middlewares/experiences.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/experiences' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, experiences_policy , add_experience)
router.delete('/:id', auth_guard, delete_experience)
router.patch('/:id', auth_guard, update_experience_policy , update_experience)

export default router
