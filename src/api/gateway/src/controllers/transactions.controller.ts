import { Request, Response } from "express";
import { fiatCurrencies, cryptoCurrencies } from "../_data/currencies";
import { ICurrency, ITransaction } from 'models/finance'
import { paginateRequest } from "../utils/paginate";
import { applyFilters, FilterFunction, SortDirection, sortItems } from "../utils/filters";
import { transactions as data } from "_data/transactions";

// Combine fiat and crypto currencies into a single list
const transactions: ITransaction[] = data;

// Define filter functions for transactions
const filtersConfig: Record<string, FilterFunction<ITransaction>> = {
    search: (item, query) =>
        item.senderName.toLocaleLowerCase().includes(query.toLowerCase()) ||
        item.recipientName.toLowerCase().includes(query.toLowerCase())
    ,
    currencyCode: (item, value) => item.currencyCode?.toUpperCase() === value,
    between: (item, value) => {
        const [startDate, endDate] = value;
        return item.createdAt >= startDate && item.createdAt <= endDate
    },
};

const transactionsController = {
    // List all currencies with filtering, sorting, and pagination
    listTransactions: async (req: Request, res: Response) => {
        const filters = req.query;
        const { sortBy = "name", sortDirection = "asc" } = filters;

        // Sort, filter, and paginate the data
        const sortedItems = sortItems(transactions, sortBy as keyof ITransaction, sortDirection as SortDirection);
        const filteredItems = applyFilters(sortedItems, filters, filtersConfig);
        const { paginatedItems, ...pagination } = paginateRequest(filteredItems, req);

        res.status(200).send({
            meta: pagination,
            data: paginatedItems,
        });
    },

    // Find a specific transaction by its code
    findTransaction: async (req: Request, res: Response) => {
        const result = transactions.find((item: ITransaction) => item.id === req.params.id.toUpperCase());

        if (!result) {
            return res.status(404).send({ message: "Currency not found" });
        }

        res.status(200).send(result);
    },
};

export default transactionsController;
