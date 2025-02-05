import { Router } from "express";
import controller from '../controllers/currencies-controller'

const router = Router()

const path = '/api'

router.get(`${path}/currencies`, controller.listCurrencies)
router.get(`${path}/currencies/:id`, controller.findCurrency)

export default {
    router,
    path
}

module.exports = {
    path,
    router
}