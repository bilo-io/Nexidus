import { Request, Response } from "express";
import { companies, ICompany } from "../../_data/places";
import { IMovie, IActor } from "@vision/core";
import { paginateRequest } from "../../utils/paginate";
import { applyFilters, FilterFunction, SortDirection, sortItems } from "../../utils/filters";


const filtersConfig: Record<string, FilterFunction<ICompany>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
};


const controller = {
    listCompanies: async (req: Request, res: Response) => {
        const filters = req.query;
        const { sortBy = 'name', sortDirection = 'asc' } = filters;
        const sortedItems = sortItems(companies, sortBy as keyof ICompany, sortDirection as SortDirection);
        const filteredItems = applyFilters(sortedItems, filters, filtersConfig);
        const result = filteredItems

        const {
            paginatedItems,
            ...pagination
        } = paginateRequest(result, req);

        res.status(200).send({
            meta: pagination,
            data: paginatedItems,
        });
    },
    findCompany: async (req: Request, res: Response) => {
        const result = companies.find((item: ICompany) => item.id === req.params.id);

        res.status(200).send(result);
    }
};

export default controller;
