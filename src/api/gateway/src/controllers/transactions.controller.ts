import { Request, Response } from 'express';
import { ITransaction } from 'models/finance';
import { paginateRequest } from '../utils/paginate';
import { applyFilters, FilterFunction, SortDirection, sortItems } from '../utils/filters';
import { transactions as data } from '../_data/transactions';

// Load transactions from data source
const transactions: ITransaction[] = data;

// Define filter functions for transactions
const filtersConfig: Record<string, FilterFunction<ITransaction>> = {
    /** Filter transactions by search query (matches externalRef or bank name). */
    search: (item, query) =>
        (item.externalRef?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
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

    /** Filter transactions by amount */
    // amount: (item, value) => item.amount === value,
};

const transactionsController = {
    /**
     * List all transactions with filtering, sorting, and pagination.
     */
    listTransactions: async (req: Request, res: Response) => {
        const filters = req.query;
        const { sortBy = 'date', sortDirection = 'desc' } = filters;

        // Sort, filter, and paginate transactions
        const sortedItems = sortItems(transactions, sortBy as keyof ITransaction, sortDirection as SortDirection);
        const filteredItems = applyFilters(sortedItems, filters, filtersConfig);
        const { paginatedItems, ...pagination } = paginateRequest(filteredItems, req);

        res.status(200).send({
            meta: pagination,
            data: paginatedItems,
        });
    },

    /**
     * Find a specific transaction by its ID.
     */
    findTransaction: async (req: Request, res: Response) => {
        const result = transactions.find((item: ITransaction) => item.id === req.params.id);

        if (!result) {
            return res.status(404).send({ message: 'Transaction not found' });
        }

        res.status(200).send(result);
    },
};

export default transactionsController;
