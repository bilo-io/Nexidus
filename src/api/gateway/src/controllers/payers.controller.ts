import { Request, Response } from 'express';
import { IActor, IMovie } from '@vision/core';
import {
    GET, POST, PUT, DELETE,
    Filter, Paginate, Status,
    DB
} from '../@decorators/rest';
import { IController } from './_controller';
import { FilterFunction } from 'utils/filters';

import { payers as allItems  } from '../_data/payers'
import { IPayer } from 'models/finance';

const path = '/api/payers'

// #region MOVIES
const filtersConfig: Record<string, FilterFunction<IPayer>> = {
    /** Filter transactions by search query (matches externalRef or bank name). */
    search: (item, query) =>
        (item.mobile?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.fullName?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.email?.toLowerCase().includes(query.toLowerCase()) ?? false),
};

export class PayersController implements IController<IPayer> {
    @GET(`${path}`)
    @DB(() => allItems)
    @Filter(filtersConfig)
    @Paginate()
    @Status([400, 404, 500])
    list(req: Request, res: Response): void {
        if (req.body.paginatedItems?.length === 0) {
            res.status(404)
            return;
        }

        res.status(200).send({
            meta: req.body.pagination,
            data: req.body.paginatedItems,
        });
    }

    @GET(`${path}/:id`)
    find(req: Request, res: Response): void {
        const result = allItems.find((item: IPayer) => item.id === req.params.id);

        res.status(200).send(result);
    }
}
// #endregion