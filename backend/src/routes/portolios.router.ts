import Router, { IRouterOptions } from 'koa-router'

import { add_portfolio, delete_portfolio, update_portfolio } from '@controllers/portfolios.controller'
import { auth_guard } from '@guards/authorization.guard'
import { portfolios_policy, update_portfolio_policy } from '@middlewares/portfolios.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/portfolios' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, portfolios_policy ,add_portfolio)
router.delete('/:id', auth_guard, delete_portfolio)
router.patch('/:id', auth_guard, update_portfolio_policy , update_portfolio)

export default router
