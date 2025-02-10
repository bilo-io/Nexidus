import 'reflect-metadata';
import { RequestHandler, Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { applyFilters, FilterFunction } from '../utils/filters';

const router = Router();

// A metadata key to store routes for each class
const ROUTE_METADATA_KEY = Symbol('routes');

// Route interface
interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    handlerName: string;
}

// Method to define the GET route decorator
export function GET(path: string): MethodDecorator {
    return (target, propertyKey) => {
        const routes = Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) || [];
        routes.push({
            path,
            method: 'get',
            handlerName: propertyKey as string,
        });
        Reflect.defineMetadata(ROUTE_METADATA_KEY, routes, target.constructor);
    };
}
// Method to define the POST route decorator
export function POST(path: string): MethodDecorator {
    return (target, propertyKey) => {
        const routes = Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) || [];
        routes.push({
            path,
            method: 'post',
            handlerName: propertyKey as string,
        });
        Reflect.defineMetadata(ROUTE_METADATA_KEY, routes, target.constructor);
    };
}

// Method to define the PUT route decorator
export function PUT(path: string): MethodDecorator {
    return (target, propertyKey) => {
        const routes = Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) || [];
        routes.push({
            path,
            method: 'put',
            handlerName: propertyKey as string,
        });
        Reflect.defineMetadata(ROUTE_METADATA_KEY, routes, target.constructor);
    };
}

// Method to define the DELETE route decorator
export function DELETE(path: string): MethodDecorator {
    return (target, propertyKey) => {
        const routes = Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) || [];
        routes.push({
            path,
            method: 'delete',
            handlerName: propertyKey as string,
        });
        Reflect.defineMetadata(ROUTE_METADATA_KEY, routes, target.constructor);
    };
}

// Function to register all routes to the Express router
export function registerRoutes(controllerClass: any, router: Router): void {
    const instance = new controllerClass();
    const routes: RouteDefinition[] = Reflect.getMetadata(ROUTE_METADATA_KEY, controllerClass) || [];

    routes.forEach((route) => {
        const handler = instance[route.handlerName] as RequestHandler;
        if (route.method === 'get') {
            router.get(route.path, handler);
        } else if (route.method === 'post') {
            router.post(route.path, handler);
        } else if (route.method === 'put') {
            router.put(route.path, handler);
        } else if (route.method === 'delete') {
            router.delete(route.path, handler);
        }
    });
}

// Database decorator
export function DB(getData: () => any[]): MethodDecorator {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
            req.body.items = getData();
            return originalMethod.apply(this, [req, res, next]);
        };
    };
}

// Filter decorator
export function Filter(filters: Record<string, FilterFunction<any>>): MethodDecorator {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
            if (req.body.items) {
                req.body.items = applyFilters(req.body.items, req.query, filters);
            }
            return originalMethod.apply(this, [req, res, next]);
        };
    };
}

// Paginate decorator
export function Paginate(): MethodDecorator {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
            if (req.body.items) {
                const { page = 1, limit = 10 } = req.query;
                const start = (Number(page) - 1) * Number(limit);
                const end = start + Number(limit);

                req.body.pagination = {
                    page: Number(page),
                    limit: Number(limit),
                    totalItems: req.body.items.length,
                    totalPages: Math.ceil(req.body.items.length / Number(limit)),
                };

                req.body.paginatedItems = req.body.items.slice(start, end);
            }
            return originalMethod.apply(this, [req, res, next]);
        };
    };
}

// Status decorator
export function Status(codes: number[] = [400, 404, 500]): MethodDecorator {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
            try {
                const result = originalMethod.apply(this, [req, res, next]);

                if (codes.includes(res.statusCode)) {
                    switch (res.statusCode) {
                        case 400:
                            res.status(400).send({ error: 'Bad Request' });
                            break;
                        case 404:
                            res.status(404).send({ error: 'Not Found' });
                            break;
                        case 500:
                            res.status(500).send({ error: 'Internal Server Error' });
                            break;
                        default:
                            console.log(`Unhandled status code: ${res.statusCode}`);
                    }
                }

                return result;
            } catch (err) {
                console.error(`Unhandled error: ${err.message}`);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        };
    };
}
