import 'reflect-metadata';
import { RequestHandler } from 'express';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export function route(path: string, method: HttpMethod): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const routes: { path: string; method: HttpMethod; handler: RequestHandler }[] =
            // @ts-ignore
            Reflect?.getMetadata('routes', target.constructor) || [];
        routes.push({ path, method, handler: descriptor.value });
        // @ts-ignore
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}