import { Request, Response } from "express";
export interface IController {
    /** `GET` request in REST to fetch a list of items */
    list?: (req: Request, res: Response) => Promise<void>;
    /** `GET` (by ID) request in REST to fetch a specific item */
    get?: (req: Request, res: Response) => void;
    /** `POST` request in REST to create a resource */
    create?: (req: Request, res: Response) => void;
    /** `PUT` | `PATCH` requests in REST to update a whole (`PUT`) or part of (`PATCH`) a model */
    update?: (req: Request, res: Response) => void;
    /** `DELETE` request in REST */
    delete?: (req: Request, res: Response) => void;
}
