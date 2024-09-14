import { Router } from 'express'
import authRouter from './auth/auth-router'
import allRouter from './all/all-router'
// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use('/all', allRouter)
// other routers can be added here

export default globalRouter
