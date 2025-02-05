import { ICurrency } from "models/finance";

export const fiatCurrencies: ICurrency[] = [
    { code: "USD", name: "United States Dollar", type: "fiat" },
    { code: "EUR", name: "Euro", type: "fiat" },
    { code: "ZAR", name: "South African Rand", type: "fiat" },
    // { code: "JPY", name: "Japanese Yen", type: "fiat" },
    // { code: "GBP", name: "British Pound Sterling", type: "fiat" },
    // { code: "AUD", name: "Australian Dollar", type: "fiat" },
    // { code: "CAD", name: "Canadian Dollar", type: "fiat" },
    // { code: "CHF", name: "Swiss Franc", type: "fiat" },
    // { code: "CNY", name: "Chinese Yuan", type: "fiat" },
    // { code: "INR", name: "Indian Rupee", type: "fiat" },
];

export const cryptoCurrencies: ICurrency[] = [
    { code: "BTC", name: "Bitcoin", type: "crypto" },
    { code: "ETH", name: "Ethereum", type: "crypto" },
    { code: "BNB", name: "Binance Coin", type: "crypto" },
    { code: "XRP", name: "Ripple", type: "crypto" },
    { code: "ADA", name: "Cardano", type: "crypto" },
    { code: "SOL", name: "Solana", type: "crypto" },
    { code: "DOT", name: "Polkadot", type: "crypto" },
    { code: "DOGE", name: "Dogecoin", type: "crypto" },
    { code: "LTC", name: "Litecoin", type: "crypto" },
    { code: "MATIC", name: "Polygon", type: "crypto" },
];