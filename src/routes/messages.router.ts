import Router, { IRouterOptions } from 'koa-router'

import { delete_all_messages, delete_message, get_all_messages, reply_message, send_message } from '@controllers/messages.controller'
import { auth_guard } from '@guards/authorization.guard'

const routerOptions: IRouterOptions = { prefix: '/api/v1/messages' }
const router: Router = new Router(routerOptions)

router.delete('/:id', auth_guard, delete_message)
router.delete('/:receiver_id', auth_guard, delete_all_messages)
router.post('/:user_id', auth_guard, send_message)
router.get('/', auth_guard, get_all_messages)
router.post('/:sender_id', auth_guard, reply_message)

export default router
