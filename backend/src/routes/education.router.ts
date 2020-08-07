import Router, { IRouterOptions } from 'koa-router'

import { add_course, delete_course, update_course } from '@controllers/education.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/education' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, add_course)
router.delete('/:id', auth_guard, delete_course)
router.patch('/:id', auth_guard, update_course)

export default router
