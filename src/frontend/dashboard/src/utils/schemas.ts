export const schemas = {
    card: `
interface ICard {
    /** Unique card ID as UUID */
    id: string;

    /** Client ID */
    clientId: string;

    /** Card number */
    PAN: string;

    /** Cardholder's name */
    name: string;

    /** Card expiry date */
    expiry: string;

    

    /** Card network (e.g., Visa, Mastercard) */
    network: string;

    /** Card type (e.g., Debit, Credit) */
    type: string;

    /** Foreign key to the PayerInformation table */
    payerId: string;
}
    `,
    cardRefund: `
interface IRefund {
    /** Unique refund ID as UUID */
    id: string;

    /** Client ID */
    clientId: string;

    /** Date and time of the refund (ISO format) */
    date: string;

    /** Amount of the refund */
    amount: number;

    /** Reason for the refund */
    reason: string;

    /** Foreign key to the Transaction table */
    transactionId: string;

    /** Foreign key to the Card table */
    cardId: string;

    /** Currency code (e.g., 'USD', 'EUR') */
    currency: string;

    /** Refund status */
    status: TransactionStatus;
}
    `,
    cardTransaction: `
interface ITransaction {
    /** Unique transaction ID as UUID */
    id: string;

    /** Client ID */
    clientId: string;

    /** Date and time of the transaction (ISO format) */
    date: string;

    /** Amount of the transaction */
    amount: number;

    /** Type of transaction (Credit or Debit) */
    type: string;

    /** Transaction status */
    status: TransactionStatus;

    /** Authentication status */
    authStatus: AuthStatus;

    /** Reference from an external system */
    externalRef?: string;

    /** Card ID (if applicable) */
    cardId?: string;

    /** Card network (e.g., Visa, Mastercard) */
    cardNetwork?: string;

    /** Currency code (e.g., 'USD', 'EUR') */
    currency: string;

    /** Payment method used */
    paymentType: PaymentType;

    /** Payer information: foreign key to the PayerInformation table */
    payerId?: string;

    /** Sender of the funds (for transfers) */
    sender?: string;

    /** Receiver of the funds (for transfers) */
    receiver?: string;

    /** Transaction fee, if applicable */
    transactionFee?: number;

    /** Merchant identifier (if applicable) */
    merchantId?: string;

    /** Bank or wallet used in case of EFT or Crypto */
    bank?: BankType;
}
    `,
    payerInformation: `
interface IPayer {
    /** Unique payer ID, as UUID */
    id: string;

    /** Client ID */
    clientId: string;

    /** Payer's full name */
    fullName: string;

    /** Payer's email address */
    email: string;

    /** Payer's mobile number */
    mobile: string;
}
    `,
    user: `
interface IUser {
    /** Unique user ID as UUID */
    id: string;

    /** User's full name */
    fullName: string;

    /** User's date of birth address */
    dateOfBirth: string;

    /** User's email address */
    email: string;
}`,
settlement: `
interface ISettlement {
    createdAt?: string | null; // Assuming ISO string format for Timestamp_NTZ
    destinationBeneficiary?: string | null;
    destinationReference?: string | null;
    id?: string | null;
    paymentMethod?: string | null;
    paymentRequestId?: string | null;
    payoutSubmissionId?: string | null;
    reconIntentId?: string | null;
    settlementReason?: string | null;
    sourceAccountNumber?: string | null;
    sourceBankId?: string | null;
    sourceReference?: string | null;
    transactionId?: string | null;
    updatedAt?: string | null; // Assuming ISO string format for Timestamp_NTZ
    riveryLastUpdate?: string | null; // Assuming ISO string format for Timestamp_NTZ
    riveryRiverId?: string | null;
    riveryRunId?: string | null;
}
`,
walletRefundTransaction: `
interface IWalletRefundTransaction {
    acquirerCode?: string | null;
    acquirerMessage?: string | null;
    clientId?: string | null;
    completedAt?: string | null; // Assuming ISO string format for Timestamp_TZ
    consentRequestId?: string | null;
    context?: string | null;
    createdAt?: string | null; // Assuming ISO string format for Timestamp_TZ
    currency?: string | null;
    externalReference?: string | null;
    id?: string | null;
    initiatorEmail?: string | null;
    internalStatusReason?: string | null;
    merchantId?: string | null;
    nonce?: string | null;
    originalTransactionId?: string | null;
    payerInformationId?: string | null;
    paymentRequestId?: string | null;
    quantity?: number | null;
    reason?: string | null;
    retrievalReferenceNumber?: string | null;
    status?: string | null;
    statusReason?: string | null;
    stitchIntermediaryAccount?: string | null;
    type?: string | null;
    updatedAt?: string | null; // Assuming ISO string format for Timestamp_TZ
`,
secure3dData: `
interface Secure3dData {
  acsReferenceNumber?: string;
  acsTransactionId?: string;
  areqToResMilliseconds?: string;
  authenticationMethod?: string;
  authMessage?: string;
  authStatus?: string;
  authTimestamp?: string;
  cavv?: string;
  createdAt?: string; // Timestamp_NTZ stored as a string
  dsTransactionId?: string;
  eci?: string;
  id?: string;
  metadata?: string;
  paresSyntaxOk?: boolean;
  paresVerified?: boolean;
  provider?: string;
  secure3dServerTransactionId?: string;
  secure3dVersion?: string;
  status?: string;
  transactionId?: string;
  updatedAt?: string; // Timestamp_NTZ stored as a string
  xid?: string;
  riveryLastUpdate?: string; // Timestamp_NTZ stored as a string
  riveryRiverId?: string;
  riveryRunId?: string;
}

`

}