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
    /** Unique transaction ID */
    id: string;

    /** Date and time of the transaction (ISO format) */
    date: string;

    /** Amount of the transaction */
    amount: number;

    /** Type of transaction (Credit or Debit) */
    type: string;

    /** Transaction status */
    status: 'pending' | 'success' | 'failed';

    /** Authentication status */
    authStatus: 'authenticated' | 'pending' | 'unauthenticated';

    /** Reference from an external system */
    externalRef?: string;

    /** Card network (e.g., Visa, Mastercard) */
    cardNetwork?: string;

    /** Currency code (e.g., 'USD', 'EUR') */
    currency: string;

    /** Payment method used */
    paymentType: 'EFT' | 'Crypto' | 'Card' | 'ApplePay' | 'GooglePay' | 'PayPal' | 'Other';

    /** Sender of the funds (for transfers) */
    sender?: string;

    /** Receiver of the funds (for transfers) */
    receiver?: string;

    /** Transaction fee, if applicable */
    transactionFee?: number;

    /** Merchant identifier (if applicable) */
    merchantId?: string;

    /** Bank or wallet used in case of EFT or Crypto */
    bank?: string;
}
