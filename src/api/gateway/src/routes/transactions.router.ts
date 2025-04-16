import { Router } from "express";
import { TransactionsController } from "../controllers/transactions.controller";

const path = '/api/transactions'
const controller = new TransactionsController();
const router = Router()

router.get(`${path}`, controller.list);
router.get(`${path}/:id`, controller.find);

export default {
    router,
    path
}

module.exports = {
    path,
    router
}