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
