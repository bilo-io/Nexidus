export const schemas = {
    card: `
interface ICard {
    id: string; // uuid v4
    createdAt: string; // ISO timestamp with time zone
    updatedAt: string; // ISO timestamp with time zone
    clientId: string;
    redactedCardNumber: string;
    redactedSecurityCode?: string;
    cardHolderName: string;
    cardUsageType: string; // 'onceOff' | 'clientReturning' | 'userReturning'
    first6: string;
    last4: string;
    externalUserId?: string;
    network?: string;
    expiryYear: number;
    expiryMonth: number;
    authorizationTransactionId?: string; // uuid v4
    issuerName?: string;
    issuerCountry?: string;
    fundingType?: string;
    interchangeType?: string;
    binRangeStart?: string;
    binRangeEnd?: string;
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
    transaction: `
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
    cardTransaction: `
interface ICardTransaction {
    id: string; // uuid v4
    quantity: number;
    currency: string;
    type: string;
    context?: Record<string, any>; // jsonb
    status: string;
    statusReason?: string;
    createdAt: string; // ISO timestamp with time zone
    updatedAt?: string; // ISO timestamp with time zone
    paymentRequestId?: string; // uuid v4
    cardId?: string; // uuid v4
    provider?: string;
    acsUrl?: string;
    clientId: string;
    paymentAuthorizationRequestId?: string; // uuid v4
    authCode?: string;
    pareq?: string;
    consentRequestId?: string; // uuid v4
    nonce: string; // uuid v4
    webhookStatus?: string;
    inDispute: boolean;
    externalReference?: string;
    originalTransactionId?: string; // uuid v4
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
    payerInformationId?: string; // uuid v4
    merchantId?: string;
    mid?: string;
    acquirer?: string;
    acquirerMessage?: string;
    acquirerCode?: string;
    tokenizedCardSecurityCode?: string;
    providerOptionKey?: string;
}
    `,
    payerInformation: `
interface interface IPayerInformation {
    id: string; // uuid v4
    createdAt: string; // ISO timestamp with time zone
    paymentRequestId?: string; // uuid v4
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
    authorizationRequestId?: string; // uuid v4
    temporaryResidenceCountry?: string;
    temporaryResidenceId?: string;
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
interface ISecure3dData {
    id: string; // uuid v4
    transactionId: string; // uuid v4
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
`,
applePayTransaction: `
interface IApplePayTransaction {
    id: string; // uuid v4
    quantity: number;
    currency: string;
    type: string;
    context?: Record<string, any>; // jsonb
    status: string;
    statusReason?: string;
    createdAt: string; // ISO timestamp with timezone
    updatedAt?: string; // ISO timestamp with timezone
    clientId: string;
    paymentRequestId?: string; // uuid v4
    consentRequestId?: string; // uuid v4
    webhookStatus?: string;
    externalReference?: string;
    nonce: string; // uuid v4
    originalTransactionId?: string; // uuid v4
    internalStatusReason?: string;
    partnerTransactionId?: string; // uuid v4
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
    payerInformationId?: string; // uuid v4
    merchantId?: string;
    walletTransactionMerchantDetailsId?: string; // uuid v4
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
    cardId?: string; // uuid v4
}
`,
googlePayTransaction: `
interface IGooglePayTransaction {
    id: string; // uuid v4
    quantity: number;
    currency: string;
    type: string;
    context?: Record<string, any>; // jsonb
    status: string;
    statusReason?: string;
    createdAt: string; // ISO timestamp with time zone
    updatedAt?: string; // ISO timestamp with time zone
    clientId: string;
    paymentRequestId?: string; // uuid v4
    consentRequestId?: string; // uuid v4
    webhookStatus?: string;
    externalReference?: string;
    nonce: string; // uuid v4
    originalTransactionId?: string; // uuid v4
    internalStatusReason?: string;
    partnerTransactionId?: string; // uuid v4
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
    payerInformationId?: string; // uuid v4
    merchantId?: string;
    walletTransactionMerchantDetailsId?: string; // uuid v4
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
    cardId?: string; // uuid v4
  }
`,
    samsungPayTransaction: `
export interface ISamsungPayTransaction {
  id: string; // uuid v4
  quantity: number;
  currency: string;
  type: string;
  context?: Record<string, any>; // jsonb
  status: string;
  statusReason?: string;
  createdAt: string; // ISO timestamp with time zone
  updatedAt?: string; // ISO timestamp with time zone
  clientId: string;
  paymentRequestId?: string; // uuid v4
  consentRequestId?: string; // uuid v4
  webhookStatus?: string;
  externalReference?: string;
  nonce: string; // uuid v4
  originalTransactionId?: string; // uuid v4
  internalStatusReason?: string;
  partnerTransactionId?: string; // uuid v4
  tokenPrimaryAccountNumber?: string;
  tokenExpirationDate?: string;
  currencyCode?: string;  // ZAR
  eciIndicator?: string;
  cryptogram?: string;
  cardLast4?: string; // last 4 digits of the card number
  cardNetwork?: string; // 'Mastercard', 'Visa', etc.
  completedAt?: string; // ISO timestamp with time zone
  retrievalReferenceNumber?: string;
  stitchIntermediaryAccount?: string;
  payerInformationId?: string; // uuid v4
  merchantId?: string;
  walletTransactionMerchantDetailsId?: string; // uuid v4
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
  cardId?: string; // uuid v4
}
    `,
    paymentRequest: `
export interface IPaymentRequest {
  id: string; // uuid, primary key, unique, default: public.gen_random_uuid()
  quantity: number; // numeric
  currency: string; // 'ZAR'
  userReference: string; // text
  beneficiaryReference: string; // text
  bankBeneficiaries: any; // jsonb (use a more specific type if available)
  createdAt: string; // timestamp without time zone, default: now()
  updatedAt?: string | null; // timestamp without time zone, nullable, default: now()
  clientId: string; // text
  paymentReference?: string | null; // text, nullable
  paymentRequestPayerConstraint?: string | null; // uuid, nullable
  cancellationReason?: string | null; // text, nullable
  status: string; // text, default: 'PENDING'
  externalReference?: string | null; // text, nullable
  authorizationRequestId?: string | null; // uuid, nullable
  expireAt?: string | null; // timestamp with time zone, nullable
  merchant?: string | null; // text, nullable
  failureReason?: string | null; // text, nullable
  restrictPayerBankId?: string | null; // text, nullable
  channel?: string | null; // text, nullable, default: 'bank'
  eftDisabled?: boolean | null; // boolean, nullable
  isSelfContainedPayment: boolean; // boolean, default: false
  payerName?: string | null; // text, nullable
  merchantId?: string | null; // uuid, nullable
  fraudOutcome?: string | null; // text, nullable
}
    `
}