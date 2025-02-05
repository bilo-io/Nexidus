import { Request, Response } from "express";
declare const controller: {
    /**  `GET` rest method, used with `/endpoint`*/
    list: (req: Request, res: Response) => void;
    /**  `GET` by `id` rest method, used with `/endpoint/:id` */
    get: (req: Request, res: Response) => void;
    /** `POST` rest method, used with `/endpoint` */
    create: (req: Request, res: Response) => void;
    /** `PUT` rest method, used with `/endpoint/:id` */
    update: (req: Request, res: Response) => void;
    /**  `DELETE` rest method, used with `/endpoint/:id` */
    delete: (req: Request, res: Response) => void;
};
export default controller;
