import { Request, Response } from "express";
import { fiatCurrencies, cryptoCurrencies } from "../_data/currencies";
import { ICurrency } from 'models/finance'
import { paginateRequest } from "../utils/paginate";
import { applyFilters, FilterFunction, SortDirection, sortItems } from "../utils/filters";

// Combine fiat and crypto currencies into a single list
const currencies: ICurrency[] = [...fiatCurrencies, ...cryptoCurrencies];

// Define filter functions for currencies
const filtersConfig: Record<string, FilterFunction<ICurrency>> = {
    search: (item, query) => item.name.toLocaleLowerCase().includes(query.toLowerCase()) || item.code.toLowerCase().includes(query.toLowerCase()),
    type: (item, type) => item.type === type,
};

const currenciesController = {
    // List all currencies with filtering, sorting, and pagination
    listCurrencies: async (req: Request, res: Response) => {
        const filters = req.query;
        const { sortBy = "name", sortDirection = "asc" } = filters;

        // Sort, filter, and paginate the data
        const sortedItems = sortItems(currencies, sortBy as keyof ICurrency, sortDirection as SortDirection);
        const filteredItems = applyFilters(sortedItems, filters, filtersConfig);
        const { paginatedItems, ...pagination } = paginateRequest(filteredItems, req);

        res.status(200).send({
            meta: pagination,
            data: paginatedItems,
        });
    },

    // Find a specific currency by its code
    findCurrency: async (req: Request, res: Response) => {
        const result = currencies.find((currency: ICurrency) => currency.code.toUpperCase() === req.params.code.toUpperCase());

        if (!result) {
            return res.status(404).send({ message: "Currency not found" });
        }

        res.status(200).send(result);
    },
};

export default currenciesController;
