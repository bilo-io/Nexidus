import { Router } from "express";
import controller from '../controllers/_deprecated/movies-controller'

const router = Router()

const path = '/api'

router.get(`${path}/movies`, controller.listMovies)
router.get(`${path}/movies/:id`, controller.findMovie)


export default {
    router,
    path
}

module.exports = {
    path,
    router
}