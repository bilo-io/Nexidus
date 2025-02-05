import { Request, Response } from "express";
declare const controller: {
    list: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => void;
    /** `POST` rest method, used with `/endpoint` */
    create: (req: Request, res: Response) => void;
};
export default controller;
