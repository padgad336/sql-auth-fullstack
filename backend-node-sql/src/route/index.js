import { Router } from "express";
import { create, getAll, getMe, login } from "./users";
import { check } from "../libs/auth";




const router = Router()
router.get('/', (req, res) => {
    res.send('🚀 Welcome FULL STACK Version 1 🚀');
});

router.route('/users')
    .get(getAll)
    .post(create)
router.route('/login').post(login)
router.route('/me').get(check, getMe)



export default router