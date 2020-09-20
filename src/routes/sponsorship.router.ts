import Router, { IRouterOptions } from 'koa-router'

import { create_sponsorship, fill_sponsorship, get_sponsors, user_sponsorship } from '@controllers/sponsorships.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/sponsorships' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, create_sponsorship)
router.put('/', auth_guard, fill_sponsorship)
router.get('/', auth_guard, user_sponsorship)
router.get('/sponsors', get_sponsors)

export default router
