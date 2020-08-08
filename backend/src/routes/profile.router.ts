import Router, { IRouterOptions } from 'koa-router'

import { auth_guard } from '@guards/authorization.guard'
import upload from '@middlewares/multer.middleware'
import { create_profile, update_profile, update_profile_picture } from '@controllers/profile.controller'

const routerOptions: IRouterOptions = { prefix: '/api/v1/profile' }
const router: Router = new Router(routerOptions)

router.post('/', auth_guard, upload.single('profile_picture'), create_profile)
router.patch('/:id', auth_guard, update_profile)
router.patch('/update_profile_pictute/:id', auth_guard, upload.single('profile_picture'), update_profile_picture)

export default router
