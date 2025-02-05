import { IDocument } from "@vision/core";
export declare const getDocuments: ({ userId }: {
    userId: number | string;
}) => IDocument[];
export declare const findDocument: ({ id, userId, }: {
    id: number | string;
    userId: string | number;
}) => IDocument;
declare const _default: {
    getDocuments: ({ userId }: {
        userId: string | number;
    }) => IDocument[];
    findDocument: ({ id, userId, }: {
        id: string | number;
        userId: string | number;
    }) => IDocument;
};
export default _default;
