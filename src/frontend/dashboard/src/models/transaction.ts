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
