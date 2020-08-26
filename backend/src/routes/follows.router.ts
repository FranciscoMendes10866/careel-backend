import Router, { IRouterOptions } from 'koa-router'

import { follow, my_followers, my_follows } from '@controllers/follows.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/follows' }
const router: Router = new Router(routerOptions)

router.post('/:user_id', auth_guard, follow)
router.get('/following', auth_guard, my_follows)
router.get('/followed', auth_guard, my_followers)


export default router
