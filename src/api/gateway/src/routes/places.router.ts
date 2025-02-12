import { Router } from "express";
import controller from '../controllers/_deprecated//places-controller'

const router = Router()

const path = '/api'

router.get(`${path}/places`, controller.listPlaces)
router.get(`${path}/places/:id`, controller.findPlace)

export default {
    router,
    path
}

module.exports = {
    path,
    router
}