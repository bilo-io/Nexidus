import { Router } from "express";
import controller from '../controllers/_deprecated/companies-controller'

const router = Router()

const path = '/api'

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