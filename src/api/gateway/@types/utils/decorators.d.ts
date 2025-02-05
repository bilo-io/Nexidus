import 'reflect-metadata';
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export declare function route(path: string, method: HttpMethod): MethodDecorator;
export {};
