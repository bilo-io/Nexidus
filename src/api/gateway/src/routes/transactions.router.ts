import { Router } from "express";
import controller from '../controllers/transactions.controller.v0'

const router = Router()

const path = '/api'

router.get(`${path}/transactions`, controller.listTransactions)
router.get(`${path}/transactions/:id`, controller.findTransaction)

export default {
    router,
    path
}

module.exports = {
    path,
    router
}