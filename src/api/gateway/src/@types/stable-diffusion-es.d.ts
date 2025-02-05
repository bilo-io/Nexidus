declare module 'stable-diffusion-es' {
    export function generate(prompt: string, result: any): any | void;

    export default {
        generate
    }
}