import Router, { IRouterOptions } from 'koa-router'

import { add_ability, delete_ability, update_ability } from '@controllers/abilities.controller'
import { auth_guard } from '@guards/authorization.guard'
import { abilities_policy, update_ability_policy } from '@middlewares/abilities.policy'

const routerOptions: IRouterOptions = { prefix: '/api/v1/abilities' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, abilities_policy, add_ability)
router.delete('/:id', auth_guard, delete_ability)
router.patch('/:id', auth_guard, update_ability_policy, update_ability)

export default router
