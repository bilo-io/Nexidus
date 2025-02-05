import { Router } from "express";
import controller from '../controllers/_deprecated/features-controller'

const router = Router()

const path = '/api/features'

router.get(`${path}/`, controller.list)
router.get(`${path}/:id`, controller.get)

export default {
    router,
    path
}

module.exports = {
    path,
    router
}