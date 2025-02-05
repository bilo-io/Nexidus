import { numberWithCommas } from '@vision/core';
import { Request, Response, NextFunction } from 'express';

export function getMethodColor(method: string): string {
    switch (method) {
        case 'GET':
            return '\x1b[32m'; // Green color for GET
        case 'POST':
            return '\x1b[34m'; // Blue color for POST
        case 'PUT':
            return '\x1b[36m'; // Cyan color for PUT
        case 'DELETE':
            return '\x1b[31m'; // Red color for DELETE
        default:
            return '\x1b[0m'; // Reset color for other methods
    }
}


export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const methodColor = getMethodColor(req.method);
    const pathColor = '\x1b[35m'; // Purple color for path
    const idColor = '\x1b[33m'; // Yellow color for ID
    const ipColor = '\x1b[36m'; // Cyan color for IP address
    const statusColor = '\x1b[32m'; // Green color for status code

    const startTime = new Date().getTime(); // Start time of the request

    const logData: string[] = [];

    // BL: Temporarily disable
    // if (req.params.id) {
    //     logData.push(`${idColor}ID: ${req.params.id}`);
    // }

    if (req.ip) {
        logData.push(`${ipColor}IP: ${req.ip}`);
    }

    if (req.headers['user-agent']) {
        logData.push(`
- User-Agent: ${req.headers['user-agent']}`);
    }

    if (req.query) {
        logData.push(`
- Query Parameters: ${JSON.stringify(req.query)}`);
    }

    // BL: Temporarily disable
    // if (req.body) {
    //     logData.push(`\n- Request Body:\n${JSON.stringify(req.body, null, 2)}`);
    // }

    // Log request data along with optional data points
    res.on('finish', () => {
        const duration = new Date().getTime() - startTime; // Calculate request duration
        const id = req?.params?.id ? ` ID: ${idColor}${req?.params?.id}\x1b[0m` : '';

        const contentLength = res.getHeader('Content-Length')  || res.getHeader('content-length');
        const sizeInBytes = contentLength ? parseInt(contentLength as string) : 0;
        const sizeInKB = Number((sizeInBytes / 1024).toFixed(1));
        const sizeInMB = Number((sizeInKB / 1024).toFixed(1));

        const sizeString = sizeInBytes >= 1024 * 1024
            ? `${numberWithCommas(sizeInMB)}MB`
            : sizeInBytes >= 1024
                ? `${numberWithCommas(sizeInKB)}KB`
                : `${sizeInBytes} bytes`

        if (contentLength) {
            logData.push(`
- Response size: ${sizeString}`)
        }

        console.log(
            `${methodColor}${req.method}\x1b[0m ${pathColor}${req.path}\x1b[0m${id}
- status: ${statusColor}${res.statusCode}\x1b[0m
- duration: ${duration} ms`,
            ...logData
        );

        console.log('--------------------')
    });

    next();
};