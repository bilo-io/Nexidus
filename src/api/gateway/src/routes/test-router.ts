import { Router } from "express";
import controller from '../controllers/test-controller'

const router = Router()

const path = '/api'

router.get(`${path}/movies`, controller.listMovies)
router.get(`${path}/movies/:id`, controller.findMovie)

router.get(`${path}/actors/`, controller.listActors)
router.get(`${path}/actors/:id`, controller.findActor)

router.get(`${path}/places`, controller.listPlaces)
router.get(`${path}/places/:id`, controller.findPlace)

router.get(`${path}/companies`, controller.listCompanies)
router.get(`${path}/companies/:id`, controller.findCompany)

export default {
    router,
    path
}

module.exports = {
    path,
    router
}