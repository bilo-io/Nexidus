import { Request, Response } from 'express';
import {
    GET, POST, PUT, DELETE,
    Filter, Paginate, Status,
    DB
} from '../@decorators/rest';
import { IController } from './_controller';
import { FilterFunction } from 'utils/filters';

import { rates as allRates } from '../_data/rates'
import { IRate } from '../models/rates';

const path = '/api'

// #region Rates
const filtersConfig: Record<string, FilterFunction<IRate>> = {
    /** Filter rates by search query (matches externalRef or bank name). */
    name: (item, query) =>
        (item.name?.toLowerCase().includes(query.toLowerCase()) ?? false)
};


export class RatesController implements IController<IRate> {
    @GET(`${path}/rates`)
    @DB(() => allRates)
    @Filter(filtersConfig)
    @Paginate()
    @Status([400, 404, 500])
    listRates(req: Request, res: Response): void {
        if (req.body.paginatedItems?.length === 0) {
            res.status(404)
            return;
        }

        res.status(200).send({
            meta: req.body.pagination,
            data: req.body.paginatedItems,
        });
    }

    @GET(`${path}/rates/:id`)
    find(req: Request, res: Response): void {
        const result = allRates.find((movie: IRate) => movie.id === req.params.id);
        res.status(200).send(result);
    }
}
// #endregion