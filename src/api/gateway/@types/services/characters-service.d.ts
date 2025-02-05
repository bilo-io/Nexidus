import { ICharacter } from "@vision/core";
export declare const getCharacters: ({ userId }: {
    userId: number | string;
}) => ICharacter[];
export declare const findCharacter: ({ id, userId, }: {
    id: number | string;
    userId: string | number;
}) => ICharacter;
declare const _default: {
    getCharacters: ({ userId }: {
        userId: string | number;
    }) => ICharacter[];
    findCharacter: ({ id, userId, }: {
        id: string | number;
        userId: string | number;
    }) => ICharacter;
};
export default _default;
