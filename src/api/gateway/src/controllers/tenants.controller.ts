import { Request, Response } from 'express';
import { IActor, IMovie } from '@vision/core';
import {
    GET, POST, PUT, DELETE,
    Filter, Paginate, Status,
    DB
} from '../@decorators/rest';
import { IController } from './_controller';
import { FilterFunction } from 'utils/filters';

import { tenants as allTenants } from '../_data/tenants'
import { ITenant } from 'models/tenant';

const path = '/api'

// #region MOVIES
const filtersConfig: Record<string, FilterFunction<ITenant>> = {
    /** Filter tenants by search query (matches externalRef or bank name). */
    name: (item, query) =>
        (item.name?.toLowerCase().includes(query.toLowerCase()) ?? false)
};


export class TenantsController implements IController<ITenant> {
    @GET(`${path}/tenants`)
    @DB(() => allTenants)
    @Filter(filtersConfig)
    @Paginate()
    @Status([400, 404, 500])
    listTenants(req: Request, res: Response): void {
        if (req.body.paginatedItems?.length === 0) {
            res.status(404)
            return;
        }

        res.status(200).send({
            meta: req.body.pagination,
            data: req.body.paginatedItems,
        });
    }

    @GET('/api/tenants/:id')
    find(req: Request, res: Response): void {
        const result = allTenants.find((movie: ITenant) => movie.id === req.params.id);
        res.status(200).send(result);
    }
}
// #endregion