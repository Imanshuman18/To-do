import express, { Router } from 'express'
import { register, getAllusers, getMyprofile,login, logout } from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router=express.Router()

router.get("/all",getAllusers)
router.post("/register",register)
router.post("/login",login)
router.get("/me",isAuthenticated,getMyprofile)
router.get("/logout",logout)

export default router