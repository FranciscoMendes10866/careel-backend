declare module 'koa' {
    interface Context {
        auth_id: string,
        auth_role: string,
        auth_admin: boolean
        auth_is_public: boolean
    }
}
