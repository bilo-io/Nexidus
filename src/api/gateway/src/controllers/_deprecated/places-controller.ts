import { Request, Response } from "express";
import { IPlace, places } from "../../_data/places";
import { IMovie, IActor } from "@vision/core";
import { paginateRequest } from "../../utils/paginate";
import { applyFilters, FilterFunction, SortDirection, sortItems } from "../../utils/filters";

const filtersConfig: Record<string, FilterFunction<IPlace>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    address: (item, address) => item.address?.toLocaleLowerCase()?.includes(address?.toLowerCase()),
    category: (item, category) => item.category?.toLocaleLowerCase()?.includes(category?.toLowerCase()),
};

const controller = {
    listPlaces: async (req: Request, res: Response) => {
        const filters = req.query;
        const { sortBy = 'name', sortDirection = 'asc' } = filters;
        const sortedItems = sortItems(places, sortBy as keyof IPlace, sortDirection as SortDirection);
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
    findPlace: async (req: Request, res: Response) => {
        const result = places.find((item: IPlace) => item.id === req.params.id);

        res.status(200).send(result);
    },
};

export default controller;
