import Router, { IRouterOptions } from 'koa-router'

import { change_email, change_is_public, change_password, change_newsletter, change_job, change_devices, get_devices } from '@controllers/account.controller'
import { auth_guard } from '@guards/authorization.guard'
import { update_email_policy, update_is_public_policy, update_password_policy, update_newsletter_policy, update_job_policy, update_devices_policy } from '@middlewares/account.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/account' }
const router: Router = new Router(routerOptions)

router.put('/change_password', auth_guard, update_password_policy, change_password)
router.put('/change_email', auth_guard, update_email_policy ,change_email)
router.put('/change_is_public', auth_guard, update_is_public_policy ,change_is_public)
router.put('/change_newsletter', auth_guard, update_newsletter_policy ,change_newsletter)
router.put('/change_job', auth_guard, update_job_policy ,change_job)
router.put('/change_devices', auth_guard, update_devices_policy, change_devices)
router.get('/get_devices', auth_guard, get_devices)

export default router
