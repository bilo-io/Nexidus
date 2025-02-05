export type CurrencyType = "fiat" | "crypto";

/**
 * ISO codes for fiat currencies
 */
export type FiatCurrencyCode =
    | 'ZAR' // South African Rand
    | 'USD' // United States Dollar
    | 'EUR' // Euro

/**
 * ISO codes for supported cryptocurrencies
 */
export type CryptoCurrencyCode =
    | 'BTC'   // Bitcoin
    | 'ETH'   // Ethereum
    | 'USDC'  // USD Coin
    | 'LTC'   // Litecoin
    | 'BNB'   // Binance Coin
    | 'XRP'   // Ripple
    | 'ADA'   // Cardano
    | 'SOL'   // Solana
    | 'DOT'   // Polkadot
    | 'DOGE'  // Dogecoin
    | 'MATIC' // Polygon

/**
 * Union of fiat and crypto currency codes
 */
export type CurrencyCode = FiatCurrencyCode | CryptoCurrencyCode;

/**
 * Currency object representing either fiat or cryptocurrency
 */
export interface ICurrency {
    /** Full name of the currency (e.g., "United States Dollar", "Bitcoin") */
    name: string;

    /** ISO code of the currency (e.g., "USD", "BTC") */
    code: CurrencyCode;

    /** Type of the currency (either "fiat" or "crypto") */
    type: CurrencyType;
}

/**
 * Represents a financial transaction
 */
export interface ITransaction {
    /** Unique identifier for the transaction */
    id: string;

    /** ISO 8601 date of transaction creation */
    createdAt: string;

    /** ISO 8601 date of the last update to the transaction */
    updatedAt: string;

    /** Amount of the transaction */
    amount: number;

    /** Currency code used in the transaction (e.g., "USD", "BTC") */
    currencyCode: CurrencyCode;

    /** Type of currency (either "fiat" or "crypto") */
    currencyType: CurrencyType;

    /** Name of the sender involved in the transaction */
    senderName: string;

    /** Name of the recipient involved in the transaction */
    recipientName: string;

    /** Reference visible to the sender (e.g., invoice number or note) */
    internalRef?: string;

    /** Reference visible to the recipient (e.g., transaction ID or message) */
    externalRef?: string;

    /** Last 4 digits of the sender's card used in the transaction (if applicable) */
    cardLast4?: string;

    /** First 6-8 digits of the sender's card (if applicable) */
    cardBin?: string;

    /** Current status of the transaction */
    status?: "pending" | "completed" | "failed";

    /** Optional description or note for the transaction */
    description?: string;

    /** Optional transaction fee applied */
    fee?: number;

    /** Exchange rate applied if the transaction involves a currency conversion */
    exchangeRate?: number;

    /** ID of the source account */
    sourceAccountId?: string;

    /** ID of the destination account */
    destinationAccountId?: string;
}
