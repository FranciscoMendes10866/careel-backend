import Router, { IRouterOptions } from 'koa-router'

import { sign_in, sign_up } from '@controllers/auth.controller'

const routerOptions: IRouterOptions = { prefix: '/api/v1/auth' }
const router: Router = new Router(routerOptions)

router.post('/sign_up', sign_up)
router.post('/sign_in', sign_in)

export default router
