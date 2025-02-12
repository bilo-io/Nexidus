export interface IRate {
    /** Unique identifier for the rate */
    id: string;

    /** Full name of the asset (e.g., Bitcoin, Ethereum) */
    name: string;

    /** Product code (e.g. USD or BTC) */
    code: string;

    /** Ticker symbol of the asset (e.g., BTC, ETH) */
    symbol: string;

    /** Current price of the asset in USD */
    priceUsd: number;

    /** Current price of the asset in BTC */
    priceBtc: number;

    /** Percentage change in price over the last 24 hours */
    change24h: number;

    /** Percentage change in price over the last 7 days */
    change7d: number;

    /** Percentage change in price over the last 30 days */
    change30d: number;

    /** Total market capitalization of the asset */
    marketCap: number;

    /** Trading volume of the asset over the last 24 hours */
    volume24h: number;
}
