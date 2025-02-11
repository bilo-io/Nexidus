import { ITenant } from "../models/tenant";

export const tenants: ITenant[] = [
    {
        id: "",
        name: "",
        clients: [
            {
                id: 'live-client-1',
                name: 'Cards & Wallets',
                type: "live"
            },
            {
                id: 'live-client-2',
                name: 'Crypto',
                type: "live"
            },
            {
                id: 'test-client-1',
                name: 'Test Client 1',
                type: "test"
            },
            {
                id: 'test-client-2',
                name: 'Test Client 2',
                type: "test"
            },
            {
                id: 'test-client-3',
                name: 'Test Client 3',
                type: "test"
            },
        ]
    }
]