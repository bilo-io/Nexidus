import { registerRoutes } from '../@decorators/rest';

import {
    ActorsController,
    CompaniesController,
    MoviesController,
    PlacesController,
} from '../controllers/test.controller';

import { CardsController } from '../controllers/cards.controller';
import { PayersController } from '../controllers/payers.controller';
import { RatesController } from '../controllers/rates.controller';
import { TransactionsController } from '../controllers/transactions.controller';
import { TenantsController } from '../controllers/tenants.controller';

const { Router } = require("express");
const router = Router()

// Test
registerRoutes(ActorsController, router)
registerRoutes(CardsController, router)
registerRoutes(CompaniesController, router)
registerRoutes(MoviesController, router)
registerRoutes(PayersController, router)
registerRoutes(PlacesController, router)
registerRoutes(RatesController, router)
registerRoutes(TenantsController, router)
registerRoutes(TransactionsController, router)

module.exports = router;