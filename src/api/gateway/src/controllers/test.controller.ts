import { Request, Response } from 'express';
import { IActor, IMovie } from '@vision/core';
import {
    GET, POST, PUT, DELETE,
    Filter, Paginate, Status,
    DB
} from '../@decorators/rest';
import { IController } from './_controller';

import { companies, ICompany, IPlace, places } from '../_data/test/places';
import { paginateRequest } from '../utils/paginate';
import { applyFilters, FilterFunction } from '../utils/filters';
import { movies as allMovies } from '../_data/test/movies';
import { actors } from '../_data/test/actors';
// import { Filter } from '../@decorators/filters';
// import { Paginate } from '../@decorators/paginate';
// import { Status } from '../@decorators/status';

const path = '/api'

// #region MOVIES
const movieFilters: Record<string, FilterFunction<IMovie>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    releaseDateAfter: (item, date) => new Date(item.releaseDate) > new Date(date),
    releaseDateBefore: (item, date) => new Date(item.releaseDate) < new Date(date),
    genres: (item, genres) => genres.every((genre: string) => item.genres?.includes(genre)),
    ratingImdb: (item, rating) => parseFloat(item.ratingImdb) >= parseFloat(rating),
    ratingRottenTomatoes: (item, rating) => parseFloat(item.ratingRottenTomatoes || "0") >= parseFloat(rating),
    ratingAudience: (item, rating) => parseFloat(item.ratingAudience || "0") >= parseFloat(rating),
};

export class MoviesController implements IController<IMovie> {
    @GET(`${path}/movies`)
    @DB(() => allMovies)
    @Filter(movieFilters)
    @Paginate()
    @Status([400, 404, 500])
    listMovies(req: Request, res: Response): void {
        if (req.body.paginatedItems?.length === 0) {
            res.status(404)
            return;
        }

        res.status(200).send({
            meta: req.body.pagination,
            data: req.body.paginatedItems,
        });
    }

    @GET('/api/movies/:id')
    find(req: Request, res: Response): void {
        const result = allMovies.find((movie: IMovie) => movie.id === req.params.id);
        res.status(200).send(result);
    }
}
// #endregion


// #region ACTORS
const actorFilters: Record<string, FilterFunction<IActor>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    dateOfBirthAfter: (item, date) => new Date(item.dateOfBirth) > new Date(date),
    dateOfBirthBefore: (item, date) => new Date(item.dateOfBirth) < new Date(date),
    gender: (item, gender) => item.gender === gender,
};

export class ActorsController implements IController<IActor> {
    @GET(`${path}/actors`)
    @DB(() => actors)
    @Filter(actorFilters)
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

    @GET(`${path}/actors/:id`)
    find(req: Request, res: Response): void {
        const result = actors.find((actor: IActor) => actor.id === req.params.id);

        res.status(200).send(result);
    }
}
// #endregion


// #region PLACES
const placesFilters: Record<string, FilterFunction<IPlace>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
    address: (item, address) => item.address?.toLocaleLowerCase()?.includes(address?.toLowerCase()),
    category: (item, category) => item.category?.toLocaleLowerCase()?.includes(category?.toLowerCase()),
};

export class PlacesController implements IController<IPlace> {
    @GET(`${path}/places`)
    @DB(() => places)
    @Filter(placesFilters)
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

    @GET(`${path}/places/:id`)
    find(req: Request, res: Response): void {
        const result = companies.find((item: ICompany) => item.id === req.params.id);

        res.status(200).send(result);
    }
}
// #endregion

// #region COMPANIES
const companiesFilter: Record<string, FilterFunction<ICompany>> = {
    search: (item, name) => item.name?.toLocaleLowerCase()?.includes(name?.toLowerCase()),
};

export class CompaniesController implements IController<ICompany> {
    @GET(`${path}/companies`)
    @DB(() => companies)
    @Filter(companiesFilter)
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

    @GET(`${path}/companies/:id`)
    find(req: Request, res: Response): void {
        const result = companies.find((item: ICompany) => item.id === req.params.id);

        res.status(200).send(result);
    }
}
// #endregion




// @POST(`${path}`)
// @GET(path)
// getUsers(req: Request, res: Response): void {
//     res.json({ message: 'Fetching users list' });
// }

// createUser(req: Request, res: Response): void {
//     const { name } = req.body;
//     res.json({ message: `User ${name} created` });
// }

// @GET(`${path}:id`)
// getUserById(req: Request, res: Response): void {
//     const { id } = req.params;
//     res.json({ message: `Fetching user with ID: ${id}` });
// }

// @PUT(`${path}:id`)
// updateUser(req: Request, res: Response): void {
//     const { id } = req.params;
//     const { name } = req.body;
//     res.json({ message: `User with ID: ${id} updated to name ${name}` });
// }

// @DELETE(`${path}:id`)
// deleteUser(req: Request, res: Response): void {
//     const { id } = req.params;
//     res.json({ message: `User with ID: ${id} deleted` });
// }