import { Request, Response } from "express";
declare const controller: {
    create: (req: Request, res: Response) => Promise<void>;
};
export default controller;
