import { Request, Response } from "express";
import { actors } from "../../_data/actors";
import { movies } from "../../_data/movies";
import { companies, ICompany, IPlace, places } from "../../_data/places";
import { IMovie, IActor } from "@vision/core";
import { paginateRequest } from "../../utils/paginate";
import { applyFilters, FilterFunction, SortDirection, sortItems } from "../../utils/filters";

// Define filter functions for movies
const filtersConfig: Record<string, FilterFunction<IMovie>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    releaseDateAfter: (item, date) => new Date(item.releaseDate) > new Date(date),
    releaseDateBefore: (item, date) => new Date(item.releaseDate) < new Date(date),
    genres: (item, genres) => genres.every((genre: string) => item.genres?.includes(genre)),
    ratingImdb: (item, rating) => parseFloat(item.ratingImdb) >= parseFloat(rating),
    ratingRottenTomatoes: (item, rating) => parseFloat(item.ratingRottenTomatoes || "0") >= parseFloat(rating),
    ratingAudience: (item, rating) => parseFloat(item.ratingAudience || "0") >= parseFloat(rating),
};

const controller = {
    listMovies: async (req: Request, res: Response) => {
        const filters = req.query;
        const { sortBy = 'name', sortDirection = 'asc' } = filters;
        const sortedItems = sortItems(movies, sortBy as keyof IMovie, sortDirection as SortDirection);
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

    findMovie: async (req: Request, res: Response) => {
        const result = movies.find((movie: IMovie) => movie.id === req.params.id);

        res.status(200).send(result);
    },
};

export default controller;
