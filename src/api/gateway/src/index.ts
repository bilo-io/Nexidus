import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './middleware/logger';
import version from './version.json';
import { corsMiddleware } from './middleware/cors';
import detectPort from 'detect-port';

// Import Vercel types
import { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize environment variables
dotenv.config();

const app: Express = express();

//#region VERCEL
app.get("/api/vercel", (req, res) => {
    res.json({ message: "Hello from Vercel API!" });
});
//#endregion

// #region MIDDLEWARE
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(corsMiddleware);
// #endregion

// #region ROUTES
app.get('/', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    const welcomeMessage = `API: v${version.version}`;
    res.end(welcomeMessage).status(200);
});

// Feature routes
app.use(require('./routes/router.v2'));

// Example ping route
app.get('/api/ping', (req: Request, res: Response) => {
    res.end('Pong!').status(200);
});

app.get('/api/', (req: Request, res: Response) => {
    res.json(
        [app._router]
            .map((routeInfo) => ({
                entityPath: routeInfo.path || '',
                stack: (routeInfo?.router?.stack || routeInfo.stack).filter(
                    (stack: any) => stack.route
                ),
            }))
            .map(({ entityPath, stack }) =>
                stack.map(({ route: { path, methods } }) => ({
                    path: entityPath ? `/api${entityPath}${path}` : path,
                    methods,
                }))
            )
            .flat()
    );
});
//#endregion

// Local port detection logic (only for local development)
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 7000;
    detectPort(port, (err, availablePort) => {
        if (err) {
            console.error('🔴 Error detecting port:', err);
            process.exit(1);
        }

        app.listen(availablePort, () => {
            console.log(`🟢 ⚡️ [server]: Server running at http://localhost:${availablePort}`);
        });
    });
}

// Vercel expects an exported handler function, no need for app.listen() in production
export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res); // Call Express with Vercel's request/response objects
};
