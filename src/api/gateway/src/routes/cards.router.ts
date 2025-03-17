import { Router } from "express";
import { CardsController } from '../controllers/cards.controller'

const path = '/api/cards'
const controller = new CardsController();
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