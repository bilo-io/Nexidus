import { Request, Response } from 'express';
import { IActor, IMovie } from '@vision/core';
import {
    GET, POST, PUT, DELETE,
    Filter, Paginate, Status,
    DB
} from '../@decorators/rest';
import { IController } from './_controller';
import { FilterFunction } from 'utils/filters';

import { transactions as allTransactions  } from '../_data/transactionsV2'

import { ITransaction } from 'models/finance';

const path = '/api'

// #region MOVIES
const filtersConfig: Record<string, FilterFunction<ITransaction>> = {
    /** Filter transactions by search query (matches externalRef or bank name). */
    search: (item, query) =>
        (item.externalRef?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.sender?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.receiver?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.payerId?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.paymentType?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.type?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.authStatus?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.bank?.toLowerCase().includes(query.toLowerCase()) ?? false),

    /** Filter transactions by exact currency match (case-insensitive). */
    currency: (item, value) => item.currency.toUpperCase() === value,

    /** Filter transactions within a date range. */
    between: (item, value) => {
        const [startDate, endDate] = value;
        return item.date >= startDate && item.date <= endDate;
    },
    /** Filter transactions with specific banks */
    bank: (item, value) => item.bank?.toLowerCase() === value?.toLowerCase(),

    /** Filter by transaction status (pending, success, failed). */
    status: (item, value) => item.status?.toLowerCase() === value?.toLowerCase(),

    /** Filter by authentication status. */
    authStatus: (item, value) => item.authStatus?.toLowerCase() === value?.toLowerCase(),

    /** Filter by transaction type (Credit or Debit). */
    type: (item, value) => item.type.toLowerCase() === value.toLowerCase(),

    /** Filter by payment type (EFT, Crypto, Card, etc.). */
    paymentType: (item, value) => item.paymentType?.toLowerCase() === value?.toLowerCase(),

    /** Filter by card network if applicable. */
    cardNetwork: (item, value) => item.cardNetwork?.toLowerCase() === value?.toLowerCase(),

    /** Filter transactions by merchant ID. */
    merchantId: (item, value) => item.merchantId === value,

    /** Filter transactions by sender */
    sender: (item, value) => item.sender?.toLowerCase() === value?.toLowerCase(),

    /** Filter transactions by receiver */
    receiver: (item, value) => item.receiver?.toLowerCase() === value?.toLowerCase(),
};


export class TransactionsController implements IController<ITransaction> {
    @GET(`${path}/transactions`)
    @DB(() => allTransactions)
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

    @GET('/api/transactions/:id')
    find(req: Request, res: Response): void {
        const result = allTransactions.find((movie: ITransaction) => movie.id === req.params.id);
        res.status(200).send(result);
    }
}
// #endregion