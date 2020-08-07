import Router, { IRouterOptions } from 'koa-router'

import { add_language, delete_language, update_language } from '@controllers/languages.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/languages' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, add_language)
router.delete('/:id', auth_guard, delete_language)
router.patch('/:id', auth_guard, update_language)

export default router
