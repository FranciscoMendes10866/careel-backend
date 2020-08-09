import Router, { IRouterOptions } from 'koa-router'

import { subscribe_newsletter, newsletter_manager } from '@controllers/newsletter.controller'
import { is_user_subscribed } from '@controllers/newsletter.controller'
import { auth_guard } from '@guards/authorization.guard'
import { is_subscribed_policy } from '@middlewares/newsletter.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/newsletter' }
const router: Router = new Router(routerOptions)

router.post('/sub', auth_guard, is_subscribed_policy ,subscribe_newsletter)
router.put('/unsub/:id', auth_guard, is_subscribed_policy ,newsletter_manager)
router.put('/sub/:id', auth_guard, is_subscribed_policy ,newsletter_manager)
router.get('/', auth_guard, is_user_subscribed)

export default router
