import { Request, Response } from 'express';
import { route } from '../utils/decorators';

export class TestController {
    private items: any[] = [];

    @route('/api/decorator', 'get')
    getAll(req: Request, res: Response) {
        res.send({
            hello: 'world'
        })
    }
}

export interface IController<T> {
    list?(req: Request, res: Response): void;    // GET all resources
    find?(req: Request, res: Response): void;    // GET a single resource by ID
    create?(req: Request, res: Response): void;  // POST a new resource
    update?(req: Request, res: Response): void;  // PUT to update an existing resource
    remove?(req: Request, res: Response): void;  // DELETE an existing resource

    // Allow any other methods
    // [key: string]: ((req: Request, res: Response) => void) | undefined;
}
