import cors from 'cors';
export declare const corsMiddleware: (req: cors.CorsRequest, res: {
    statusCode?: number;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
