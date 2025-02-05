export interface CardPayin {
    id: string; // Unique identifier for the payin
    referenceNumber: string; // Payment reference number
    authStatus: "Approved" | "Pending" | "Declined"; // Authorization status
    status: "Completed" | "Processing" | "Failed"; // Payment processing status
    dateCreated: string; // Date the payin was created (ISO 8601 format preferred)
    amount: number; // Payment amount
    currency: string; // Currency code (e.g., USD, EUR, GBP)
    cardHolderName: string; // Name of the cardholder
    cardLastFour: string; // Last four digits of the card used
}
