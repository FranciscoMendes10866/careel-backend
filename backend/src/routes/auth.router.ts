import Router, { IRouterOptions } from 'koa-router'

import { SignUp } from '@controllers/auth.controller'

const routerOptions: IRouterOptions = { prefix: '/api/v1/auth' }
const router: Router = new Router(routerOptions)

router.get('/', SignUp)

export default router
