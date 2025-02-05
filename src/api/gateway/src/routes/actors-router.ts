import { Router } from "express";
import controller from '../controllers/_deprecated/actors-controller'

const router = Router()

const path = '/api'

router.get(`${path}/actors/`, controller.listActors)
router.get(`${path}/actors/:id`, controller.findActor)

export default {
    router,
    path
}

module.exports = {
    path,
    router
}