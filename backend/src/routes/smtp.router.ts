import Router, { IRouterOptions } from 'koa-router'

import { smtp_employers, smtp_talents } from '@services/smtp.service'

const routerOptions: IRouterOptions = { prefix: '/api/v1/smtp' }
const router: Router = new Router(routerOptions)

router.get('/talents', smtp_talents)
router.get('/employer', smtp_employers)

export default router
