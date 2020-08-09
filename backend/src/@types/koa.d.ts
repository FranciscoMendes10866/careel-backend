import { Context } from 'koa'

declare module 'koa' {
    interface Context {
        auth_id: string,
        auth_role: string,
        auth_admin: boolean
    }
}
