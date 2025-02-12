import { ITenant, DashboardFeature } from "../models/tenant";
import { v4 as uuidv4 } from "uuid";

export const tenants: ITenant[] = [
    {
        id: uuidv4(),
        name: "FinTrust Bank",
        clients: [
            {
                id: `live-${uuidv4()}`,
                name: "Wealth Management",
                type: "live",
                features: ['card', 'reporting']
            },
            {
                id: `live-${uuidv4()}`,
                name: "Corporate Banking",
                type: "live",
                features: ['wallet', 'recon']
            },
            {
                id: `test-${uuidv4()}`,
                name: "Payment Gateway Sandbox",
                type: "test",
                features: ['refunds', 'reporting']
            }
        ]
    },
    {
        id: uuidv4(),
        name: "NeoPay Solutions",
        clients: [
            {
                id: `live-${uuidv4()}`,
                name: "Merchant Processing",
                type: "live",
                features: ['card', 'wallet', 'reporting']
            },
            {
                id: `live-${uuidv4()}`,
                name: "Mobile Wallets",
                type: "live",
                features: ['wallet', 'refunds']
            },
            {
                id: `test-${uuidv4()}`,
                name: "Beta Crypto Transfers",
                type: "test",
                features: ['recon', 'reporting']
            },
            {
                id: `test-${uuidv4()}`,
                name: "Test Banking APIs",
                type: "test",
                features: ['card', 'refunds']
            }
        ]
    },
    {
        id: uuidv4(),
        name: "SecurePay Inc.",
        clients: [
            {
                id: `live-${uuidv4()}`,
                name: "Fraud Detection",
                type: "live",
                features: ['recon', 'reporting']
            },
            {
                id: `live-${uuidv4()}`,
                name: "Card Issuing",
                type: "live",
                features: ['card', 'wallet']
            },
            {
                id: `test-${uuidv4()}`,
                name: "Risk Assessment Engine",
                type: "test",
                features: ['refunds', 'recon']
            }
        ]
    }
];
