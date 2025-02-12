export type DashboardFeature = 
    | 'card'
    | 'wallet'
    | 'refunds'
    | 'recon'
    | 'reporting'

export interface ITenant {
    id: string,
    name: string,
    clients: {
        id: string,
        name: string,
        type: 'live' | 'test',
        features: DashboardFeature[]
    }[],
}