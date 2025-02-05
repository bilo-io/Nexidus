import { Router } from "express";
import controller from '../controllers/ai-controller'

const router = Router()
const path = '/api/ai'

// router.get(`${path}/`, controller.list)
// router.get(`${path}/:id`, controller.get)

// router.post(`${path}/text`, controller.getToxicity)
// router.post(`${path}/qna`, controller.getQnA)
// router.put(`${path}/:id`, controller.update)
// router.patch(`${path}/:id`, controller.update)
// router.delete(`${path}/:id`, controller.delete)

export default {
    router,
    path
}

module.exports = {
    router,
    path
}
