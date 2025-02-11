import {
    ActorsController,
    CompaniesController,
    MoviesController,
    PlacesController,
} from '../controllers/test.controller';
import { TransactionsController } from '../controllers/transactions.controller.v2';
import { TenantsController } from '../controllers/tenants.controller';

import { registerRoutes } from '../@decorators/rest';
const { Router } = require("express");
const router = Router()

// Test
registerRoutes(ActorsController, router)
registerRoutes(CompaniesController, router)
registerRoutes(MoviesController, router)
registerRoutes(PlacesController, router)
registerRoutes(TransactionsController, router)
registerRoutes(TenantsController, router)

module.exports = router;