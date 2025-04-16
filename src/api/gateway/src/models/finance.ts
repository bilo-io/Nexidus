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

type TransactionStatus =
    | "success"
    | "pending"
    | "failed"

type AuthStatus =
    | "authenticated"
    | "unauthenticated"
    | "pending"
    | "failed"

type PaymentType =
    | "EFT"
    | "Crypto"
    | "Card"
    | "ApplePay"
    | "GooglePay"
    | "PayPal"
    | "Other"

type BankType =
    | "FNB"
    | "Nedbank"
    | "ABSA"
    | "Standard Bank"
    | "Capitec"
    | "TymeBank"
    | "Bidvest"
    | "Discovery"
/**
 * Represents a financial transaction
 */
export interface ITransaction {
    /** Unique transaction ID as UUID */
    id: string;

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

/**
 * Represents a payer's information
 */
export interface IPayer {
    /** Unique payer ID, as UUID */
    id: string;

    /** Payer's full name */
    fullName: string;

    /** Payer's email address */
    email: string;

    /** Payer's mobile number */
    mobile: string;
}

export interface ICard {
    /** Unique card ID as UUID */
    id: string;

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

export interface ICardRefund {
    /** Unique refund ID as UUID */
    id: string;

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

export interface ICard {
    id: string; // uuid
    createdAt: string; // ISO timestamp with time zone
    updatedAt: string; // ISO timestamp with time zone
    clientId: string;
    redactedCardNumber: string;
    redactedSecurityCode?: string;
    cardHolderName: string;
    cardUsageType: string;
    first6: string;
    last4: string;
    externalUserId?: string;
    expiryYear: number;
    expiryMonth: number;
    authorizationTransactionId?: string; // uuid
    issuerName?: string;
    issuerCountry?: string;
    fundingType?: string;
    interchangeType?: string;
    binRangeStart?: string;
    binRangeEnd?: string;
  }
  
// #region STITCH
export interface ICryptoTransaction {
    clientId?: string | null; // UUID
    completedAt?: string | null; // Assuming ISO string format for Timestamp_TZ
    consentRequestId?: string | null;
    context?: string | null;
    createdAt?: string | null; // Assuming ISO string format for Timestamp_TZ
    cryptocurrency?: string | null; // BTC, USDT, ETH etc.
    cryptocurrencyAmount?: number | null;
    currency?: string | null; // ZAR, USD, EUR etc.
    depositAddress?: string | null;
    externalReference?: string | null;
    id?: string | null;
    internalStatusReason?: string | null;
    merchantId?: string | null;
    method?: string | null;
    nonce?: string | null;
    originalTransactionId?: string | null;
    partnerRequestId?: string | null;
    payerInformationId?: string | null;
    paymentRequestId?: string | null;
    quantity?: number | null;
    senderAddress?: string | null;
    status?: string | null;
    statusReason?: string | null;
    stitchIntermediaryAccount?: string | null;
    transactionHash?: string | null;
    type?: string | null;
}

export interface ISettlement {
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

export interface IWalletRefundTransaction {
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
}

export interface IApplePayTransaction {
    id: string; // uuid
    quantity: number;
    currency: string;
    type: string;
    context?: Record<string, any>; // jsonb
    status: string; // SUCCESS, PENDING, FAILURE, INFLIGHT, CANCELLED
    statusReason?: string;
    createdAt: string; // ISO timestamp with timezone
    updatedAt?: string; // ISO timestamp with timezone
    clientId: string;
    paymentRequestId?: string; // uuid
    consentRequestId?: string; // uuid
    webhookStatus?: string;
    externalReference?: string;
    nonce: string; // uuid
    originalTransactionId?: string; // uuid
    internalStatusReason?: string;
    partnerTransactionId?: string; // uuid
    applicationPrimaryAccountNumber?: string; // card number
    applicationExpirationDate?: string;
    currencyCode?: string; // ZAR
    cardholderName?: string;
    deviceManufacturerId?: string;
    paymentDataType?: string;
    onlinePaymentCryptogram?: string;
    eciIndicator?: string;
    cardDisplayName?: string;
    cardNetwork?: string;
    cardType?: string;
    completedAt?: string; // timestamp with time zone
    retrievalReferenceNumber?: string;
    stitchIntermediaryAccount?: string;
    payerInformationId?: string; // uuid
    merchantId?: string;
    walletTransactionMerchantDetailsId?: string; // uuid
    cardIssuerName?: string;
    cardIssuerCountry?: string;
    cardInterchangeType?: string;
    authCode?: string;
    provider?: string;
    secure3dDecision?: string;
    secure3dDecisionReason?: string;
    acquirerMessage?: string;
    acquirerCode?: string;
    paymentToken?: string;
    bin?: string;
    voidAt?: string; // timestamp with time zone
    isPreAuthorization?: boolean;
    originalQuantity?: number;
    providerOptionKey?: string;
    acquirer?: string;
    mid?: string;
    cardId?: string; // uuid
}

export interface IGooglePayTransaction {
    id: string; // uuid
    quantity: number;
    currency: string;
    type: string;
    context?: Record<string, any>; // jsonb
    status: string;
    statusReason?: string;
    createdAt: string; // ISO timestamp with time zone
    updatedAt?: string; // ISO timestamp with time zone
    clientId: string;
    paymentRequestId?: string; // uuid
    consentRequestId?: string; // uuid
    webhookStatus?: string;
    externalReference?: string;
    nonce: string;
    originalTransactionId?: string; // uuid
    internalStatusReason?: string;
    partnerTransactionId?: string; // uuid
    primaryAccountNumber?: string;
    expirationYear?: string;
    expirationMonth?: string;
    eciIndicator?: string;
    cryptogram?: string;
    cardLast4?: string;
    cardNetwork?: string;
    completedAt?: string; // ISO timestamp with time zone
    retrievalReferenceNumber?: string;
    stitchIntermediaryAccount?: string;
    payerInformationId?: string; // uuid
    merchantId?: string;
    walletTransactionMerchantDetailsId?: string; // uuid
    cardIssuerName?: string;
    cardIssuerCountry?: string;
    cardType?: string;
    cardInterchangeType?: string;
    authCode?: string;
    provider?: string;
    secure3dDecision?: string;
    secure3dDecisionReason?: string;
    acquirerMessage?: string;
    acquirerCode?: string;
    paymentToken?: string;
    bin?: string;
    voidAt?: string; // ISO timestamp with time zone
    isPreAuthorization?: boolean;
    originalQuantity?: number;
    providerOptionKey?: string;
    acquirer?: string;
    mid?: string;
    cardId?: string; // uuid
  }
  

export interface IPayerInformation {
    id: string; // uuid
    createdAt: string; // ISO timestamp with time zone
    paymentRequestId?: string; // uuid
    payerId?: string;
    fullName?: string;
    accountCreatedDate?: string;
    mobileNumber?: string;
    email?: string;
    businessRegistrationNumber?: string;
    businessRegistrationCountry?: string;
    idNumber?: string;
    idCountry?: string;
    passportNumber?: string;
    passportCountry?: string;
    clientId?: string;
    authorizationRequestId?: string; // uuid
    temporaryResidenceCountry?: string;
    temporaryResidenceId?: string;
}

export interface ISecure3dData {
    id: string; // uuid
    transactionId: string; // uuid
    status: string;
    createdAt: string; // ISO timestamp with time zone
    updatedAt?: string; // ISO timestamp with time zone
    provider?: string;
    authStatus?: string;
    eci?: string;
    cavv?: string;
    xId?: string;
    paresVerified?: boolean;
    paresSyntaxOk?: boolean;
    secure3dServerTransactionId?: string;
    dsTransactionId?: string;
    acsTransactionId?: string;
    acsReferenceNumber?: string;
    authTimestamp?: string;
    areqToResMilliseconds?: string;
    secure3dVersion?: string;
    authenticationMethod?: string;
    metadata?: Record<string, any>; // jsonb
    authMessage?: string;
}

export interface ICardTransaction {
    id: string; // uuid
    quantity: number;
    currency: string;
    type: string;
    context?: Record<string, any>; // jsonb
    status: string;
    statusReason?: string;
    createdAt: string; // ISO timestamp with time zone
    updatedAt?: string; // ISO timestamp with time zone
    paymentRequestId?: string; // uuid
    cardId?: string; // uuid
    provider?: string;
    acsUrl?: string;
    clientId: string;
    paymentAuthorizationRequestId?: string; // uuid
    authCode?: string;
    pareq?: string;
    consentRequestId?: string; // uuid
    nonce: string;
    webhookStatus?: string;
    inDispute: boolean;
    externalReference?: string;
    originalTransactionId?: string; // uuid
    internalStatusReason?: string;
    originalQuantity: number;
    voidAt?: string; // ISO timestamp with time zone
    isPreAuthorization: boolean;
    scenario?: string;
    completedAt?: string; // ISO timestamp with time zone
    retrievalReferenceNumber?: string;
    secure3dDecision?: string;
    secure3dDecisionReason?: string;
    stitchIntermediaryAccount?: string;
    payerInformationId?: string; // uuid
    merchantId?: string;
    mid?: string;
    acquirer?: string;
    acquirerMessage?: string;
    acquirerCode?: string;
    tokenizedCardSecurityCode?: string;
    providerOptionKey?: string;
  }
  
// #endregion