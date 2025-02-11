const { Router } = require("express");

const router = Router()
// feature/controller routes
import ai from './ai-router'
import actors from './actors-router'
import companies from './companies-router'
import currencies from './currencies-router'
import features from './features-router'
import movies from './movies-router'
import places from './places-router'
import transactions from './transactions-router'
import test from './test-router'


// link to router
router.use('/', ai.router);
router.use('/', actors.router)
router.use('/', companies.router)
router.use('/', currencies.router)
router.use('/', features.router)
router.use('/', movies.router)
router.use('/', places.router)
router.use('/', transactions.router)
router.user('/', test.router)

export const apiRoutes = [
    ai.path,
    actors.path,
    movies.path,
    companies.path,
    currencies.path,
    places.path,
    transactions.path,
]

module.exports = router;