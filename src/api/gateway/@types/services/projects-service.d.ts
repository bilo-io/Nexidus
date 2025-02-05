import { IProject } from "@vision/core";
export declare const getProjects: ({ userId }: {
    userId: number | string;
}) => IProject[];
export declare const findProject: ({ id, userId, }: {
    id: number | string;
    userId: string | number;
}) => IProject;
declare const _default: {
    getProjects: ({ userId }: {
        userId: string | number;
    }) => IProject[];
    findProject: ({ id, userId, }: {
        id: string | number;
        userId: string | number;
    }) => IProject;
};
export default _default;
