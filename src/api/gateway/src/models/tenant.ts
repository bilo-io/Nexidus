export interface ITenant {
    id: string,
    name: string,
    clients: {
        id: string,
        name: string,
        type: 'live' | 'test'
    }[],
}