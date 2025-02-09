export interface ITransaction {
    id: string;               // Unique transaction ID
    date: string;             // Date and time of the transaction (ISO format)
    amount: number;           // Amount of the transaction
    type: string;             // Type of transaction (Credit or Debit)
    status: 'pending' | 'success' | 'failed';  // Transaction status
    authStatus: 'authenticated' | 'pending' | 'unauthenticated';
    externalRef?: string;     // Reference from an external system
    cardNetwork?: string;             // Reference number for the transaction
    currency: string;         // Currency code (e.g., 'USD', 'EUR')
    paymentType: 'EFT' | 'Crypto' | 'Card' | 'ApplePay' | 'GooglePay' | 'PayPal' | 'Other';  // Payment method used
    sender?: string;          // Sender of the funds (for transfers)
    receiver?: string;        // Receiver of the funds (for transfers)
    transactionFee?: number;  // Transaction fee, if applicable
    merchantId?: string;      // Merchant identifier (if applicable)
    bank?: string;            // Bank or wallet used in case of EFT or Crypto
}