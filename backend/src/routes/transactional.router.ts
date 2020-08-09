import Router, { IRouterOptions } from 'koa-router'

import { forgotten_password } from '@services/transactional.service'

const routerOptions: IRouterOptions = { prefix: '/api/v1/transactional' }
const router: Router = new Router(routerOptions)

router.post('/forgotten_password', forgotten_password)

export default router
