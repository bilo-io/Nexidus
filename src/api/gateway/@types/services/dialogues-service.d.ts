import { IDialogue } from "@vision/core";
export declare const getDialogues: ({ userId }: {
    userId: number | string;
}) => IDialogue[];
export declare const findDialogue: ({ id, userId, }: {
    id: number | string;
    userId: string | number;
}) => IDialogue;
declare const _default: {
    getDialogues: ({ userId }: {
        userId: string | number;
    }) => IDialogue[];
    findDialogue: ({ id, userId, }: {
        id: string | number;
        userId: string | number;
    }) => IDialogue;
};
export default _default;
