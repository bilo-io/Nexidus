import { IFeature } from "@vision/core";

export const allFeatures: IFeature[] = [
    // {
    //     key: 'workspaces',
    //     isActive: true,
    //     message: '',
    //     status: 'ready',
    //     updatedAt: '',
    // },
    // {
    //     key: 'projects',
    //     isActive: true,
    //     message: '',
    //     status: 'ready',
    //     updatedAt: '',
    // },
    // Project features

    {
        key: 'locations',
        isActive: true,
        message: '',
        status: 'alpha',
        updatedAt: '',
    },
    {
        key: 'objects',
        isActive: true,
        message: "",
        status: 'concept'
    },

    // ----

    {
        key: 'documents',
        isActive: true,
        message: '',
        status: 'alpha',
        updatedAt: '',
    },

    {
        key: 'graphs',
        isActive: true,
        message: '',
        status: 'pre-alpha',
        updatedAt: '',
    },
    {
        key: 'segments',
        isActive: true,
        message: '',
        status: 'beta',
        updatedAt: '',
    },
    // AI Features
    {
        key: 'ai',
        isActive: true,
        message: '',
        status: 'alpha',
        updatedAt: '',
    },

]

export default allFeatures;