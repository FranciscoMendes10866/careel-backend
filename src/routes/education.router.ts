import Router, { IRouterOptions } from 'koa-router'

import { add_course, delete_course, update_course } from '@controllers/education.controller'
import { auth_guard } from '@guards/authorization.guard'
import { education_policy, update_education_policy } from '@middlewares/education.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/education' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, education_policy , add_course)
router.delete('/:id', auth_guard, delete_course)
router.patch('/:id', auth_guard, update_education_policy , update_course)

export default router
