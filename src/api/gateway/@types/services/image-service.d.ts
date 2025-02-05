import FormData from 'form-data';
export declare const generateImageV1: (prompt: string, success?: Function, error?: Function) => Promise<void>;
export declare const generateImageV3: (prompt: string, success?: Function, error?: Function) => Promise<void>;
declare const _default: {
    generateImageV1: (prompt: string, success?: Function, error?: Function) => Promise<void>;
    generateImageV2: (prompt: string) => Promise<FormData>;
    generateImageV3: (prompt: string, success?: Function, error?: Function) => Promise<void>;
};
export default _default;
