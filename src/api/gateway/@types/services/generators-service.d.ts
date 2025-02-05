import { IGenerator, IGeneratorType, IMediaType } from "@vision/core";
export declare const list: (type?: IGeneratorType) => Promise<IGenerator[]>;
export declare const generate: (type: IGeneratorType | IMediaType, { userPrompt, systemPrompt, success, error, }: {
    userPrompt: string;
    systemPrompt: string;
    success?: (obj: any) => void;
    error?: (obj: any) => void;
}) => Promise<any>;
declare const _default: {
    generate: (type: "Text" | "Image" | "Audio" | "Video" | "Sound", { userPrompt, systemPrompt, success, error, }: {
        userPrompt: string;
        systemPrompt: string;
        success?: (obj: any) => void;
        error?: (obj: any) => void;
    }) => Promise<any>;
};
export default _default;
