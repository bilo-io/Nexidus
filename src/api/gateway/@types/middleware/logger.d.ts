import { Request, Response, NextFunction } from 'express';
export declare function getMethodColor(method: string): string;
export declare function loggerMiddleware(req: Request, res: Response, next: NextFunction): void;
