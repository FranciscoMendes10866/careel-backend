import Router, { IRouterOptions } from 'koa-router'

import { forgotten_password } from '@services/transactional.service'
import { transactional_policy } from '@middlewares/transactional.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/transactional' }
const router: Router = new Router(routerOptions)

router.post('/forgotten_password', transactional_policy , forgotten_password)

export default router
