import { Router } from "express";
import { PayersController } from '../controllers/payers.controller'

const path = '/api/payers'
const controller = new PayersController();
const router = Router()

router.get(`${path}`, controller.list)
router.get(`${path}/:id`, controller.find)

export default {
    router,
    path
}

module.exports = {
    path,
    router
}