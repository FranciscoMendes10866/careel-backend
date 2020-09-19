import Router, { IRouterOptions } from 'koa-router'

import { smtp_all, smtp_employers, smtp_talents } from '@services/smtp.service'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/smtp' }
const router: Router = new Router(routerOptions)

router.get('/', auth_guard, smtp_all)
router.get('/talents', auth_guard, smtp_talents)
router.get('/employer', auth_guard, smtp_employers)

export default router
