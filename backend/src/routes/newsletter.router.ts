import Router, { IRouterOptions } from 'koa-router'

import { subscribe_newsletter, newsletter_manager } from '@controllers/newsletter.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/newsletter' }
const router: Router = new Router(routerOptions)

router.post('/sub', auth_guard, subscribe_newsletter)
router.put('/unsub/:id', auth_guard, newsletter_manager)
router.put('/sub/:id', auth_guard, newsletter_manager)

export default router
