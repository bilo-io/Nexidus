import { Request, Response } from "express";
declare const controller: {
    list: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => Promise<void>;
    gpt: (req: Request, res: Response) => Promise<void>;
};
export default controller;
