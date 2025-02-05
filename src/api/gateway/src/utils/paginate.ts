import { Request } from "express";

export const paginate = <T>(items: T[], page: number = 1, limit: number = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
        paginatedItems: items.slice(startIndex, endIndex),
        limit,
        page,
        totalPages: Math.ceil(items.length / limit),
        totalItems: items.length,
    };
};

export const paginateRequest = <T>(items: T[], req: Request) => {
    const { page = 1, limit = 10 } = req.query;

    return paginate(items, parseInt(page as string), parseInt(limit as string))
};
