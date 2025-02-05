import { Request, Response } from "express";
import { actors } from "../../_data/actors";
import { movies } from "../../_data/movies";
import { companies, ICompany, IPlace, places } from "../../_data/places";
import { IMovie, IActor } from "@vision/core";
import { paginateRequest } from "../../utils/paginate";
import { applyFilters, FilterFunction, SortDirection, sortItems } from "../../utils/filters";

// Define filter functions for actors
const filtersConfig: Record<string, FilterFunction<IActor>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    dateOfBirthAfter: (item, date) => new Date(item.dateOfBirth) > new Date(date),
    dateOfBirthBefore: (item, date) => new Date(item.dateOfBirth) < new Date(date),
    gender: (item, gender) => item.gender === gender,
};

const controller = {
    listActors: async (req: Request, res: Response) => {
        const filters = req.query;
        const { sortBy = 'name', sortDirection = 'asc' } = filters;
        const sortedItems = sortItems(actors, sortBy as keyof IActor, sortDirection as SortDirection);
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
    findActor: async (req: Request, res: Response) => {
        const result = actors.find((actor: IActor) => actor.id === req.params.id);

        res.status(200).send(result);
    },

};

export default controller;
