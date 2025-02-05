import cors from 'cors';
import { NextFunction, Request, Response } from "express";

// Static allowed origins
const allowedOrigins: string[] = [
    'https://app-octiv-test.vercel.app',
    // Jadon Hansen
    'https://spatial-awareness.vercel.app',
    // Denis Siduna
    'https://octiv-denis.vercel.app',
    // Luqmaan Essop
    'https://le-oktiv-assessment.vercel.app',
    // Nick Craze
    'https://my-map-app-rho.vercel.app',
    // Siya
    'https://octivfitness.vercel.app',
    // Charles
    'https://octiv.vercel.app'
];

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Dynamically allow any localhost with any port
        const localhostRegex = /^http?:\/\/localhost(:\d+)?$/;
        if (localhostRegex.test(origin)) {
            return callback(null, true);
        }

        // Allow specific hosted URLs in allowedOrigins
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Reject any other origins
        return callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
});
