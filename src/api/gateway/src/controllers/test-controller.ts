import { Request, Response } from "express";
import { actors } from "../_data/actors";
import { movies } from "../_data/movies";
import { companies, ICompany, IPlace, places } from "../_data/places";
import { IMovie, IActor } from "@vision/core";
import { paginateRequest } from "../utils/paginate";

type FilterFunction<T> = (item: T, filterValue: any) => boolean;

const applyFilters = <T>(items: T[], filters: Record<string, any>, filterFunctions: Record<string, FilterFunction<T>>): T[] => {
    return items.filter(item =>
        Object.keys(filters).every(key =>
            filterFunctions[key] ? filterFunctions[key](item, filters[key]) : true
        )
    );
};

// Define filter functions for movies
const movieFilters: Record<string, FilterFunction<IMovie>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    releaseDateAfter: (item, date) => new Date(item.releaseDate) > new Date(date),
    releaseDateBefore: (item, date) => new Date(item.releaseDate) < new Date(date),
    genres: (item, genres) => genres.every((genre: string) => item.genres?.includes(genre)),
    ratingImdb: (item, rating) => parseFloat(item.ratingImdb) >= parseFloat(rating),
    ratingRottenTomatoes: (item, rating) => parseFloat(item.ratingRottenTomatoes || "0") >= parseFloat(rating),
    ratingAudience: (item, rating) => parseFloat(item.ratingAudience || "0") >= parseFloat(rating),
};

// Define filter functions for actors
const actorFilters: Record<string, FilterFunction<IActor>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    dateOfBirthAfter: (item, date) => new Date(item.dateOfBirth) > new Date(date),
    dateOfBirthBefore: (item, date) => new Date(item.dateOfBirth) < new Date(date),
    gender: (item, gender) => item.gender === gender,
};

const placesFilters: Record<string, FilterFunction<IPlace>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    address: (item, address) => item.address?.toLocaleLowerCase()?.includes(address?.toLowerCase()),
    category: (item, category) => item.category?.toLocaleLowerCase()?.includes(category?.toLowerCase()),
};

const companiesFilter: Record<string, FilterFunction<ICompany>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
};


const controller = {
    listMovies: async (req: Request, res: Response) => {
        const filters = req.query;
        const filteredMovies = applyFilters(movies, filters, movieFilters);

        const {
            paginatedItems,
            ...pagination
        } = paginateRequest(filteredMovies, req);

        res.status(200).send({
            meta: pagination,
            data: paginatedItems,
        });
    },

    findMovie: async (req: Request, res: Response) => {
        const result = movies.find((movie: IMovie) => movie.id === req.params.id);

        res.status(200).send(result);
    },

    listActors: async (req: Request, res: Response) => {
        const filters = req.query;
        const filteredActors = applyFilters(actors, filters, actorFilters);

        const {
            paginatedItems,
            ...pagination
        } = paginateRequest(filteredActors, req);

        res.status(200).send({
            meta: pagination,
            data: paginatedItems,
        });
    },
    findActor: async (req: Request, res: Response) => {
        const result = actors.find((actor: IActor) => actor.id === req.params.id);

        res.status(200).send(result);
    },

    listPlaces: async (req: Request, res: Response) => {
        const filters = req.query;
        const filteredActors = applyFilters(places, filters, placesFilters);

        const {
            paginatedItems,
            ...pagination
        } = paginateRequest(filteredActors, req);

        res.status(200).send({
            meta: pagination,
            data: paginatedItems,
        });
    },
    findPlace: async (req: Request, res: Response) => {
        const result = companies.find((item: ICompany) => item.id === req.params.id);

        res.status(200).send(result);
    },

    listCompanies: async (req: Request, res: Response) => {
        const filters = req.query;
        const filteredActors = applyFilters(companies, filters, companiesFilter);

        const {
            paginatedItems,
            ...pagination
        } = paginateRequest(filteredActors, req);

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
