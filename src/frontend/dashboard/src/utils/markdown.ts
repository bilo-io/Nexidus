export function removeMarkdownCodeBlock(text: string): string {
    return text.replace(/^```[\w]*\n/, '').replace(/\n```$/, '');
}

export function extractCodeLanguage(markdown: string): string | null {
    const match = markdown.match(/^```(\w+)/);
    return match ? match[1] : null;
}

// Example usage:
const rawText = `\`\`\`sql
BEGIN;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    age INT
);

INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 30);
INSERT INTO users (name, email, age) VALUES ('Bob', 'bob@example.com', 24);
INSERT INTO users (name, email, age) VALUES ('Charlie', 'charlie@example.com', 29);
INSERT INTO users (name, email, age) VALUES ('David', 'david@example.com', 35);
INSERT INTO users (name, email, age) VALUES ('Eve', 'eve@example.com', 28);
INSERT INTO users (name, email, age) VALUES ('Frank', 'frank@example.com', 40);
INSERT INTO users (name, email, age) VALUES ('Grace', 'grace@example.com', 22);
INSERT INTO users (name, email, age) VALUES ('Heidi', 'heidi@example.com', 37);
INSERT INTO users (name, email, age) VALUES ('Ivan', 'ivan@example.com', 31);
INSERT INTO users (name, email, age) VALUES ('Judy', 'judy@example.com', 26);

COMMIT;
\`\`\``;

const rawText2 = `
\`\`\`;sql
INSERT INTO payerInformation (id, clientId, fullName, email, mobile) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'bilo-testing', 'John Doe', 'john.doe@example.com', '+1234567890');

INSERT INTO card (id, clientId, PAN, name, expiry, network, type, payerId) VALUES
('123e4567-e89b-12d3-a456-426614174001', 'bilo-testing', '1234567812345678', 'John Doe', '2025-12', 'Visa', 'Credit', '123e4567-e89b-12d3-a456-426614174000');

INSERT INTO cardTransaction (id, clientId, date, amount, type, status, authStatus, externalRef, cardId, cardNetwork, currency, paymentType, payerId, sender, receiver, transactionFee, merchantId, bank) VALUES
('123e4567-e89b-12d3-a456-426614174002', 'bilo-testing', '2023-10-15T14:48:00', 100.00, 'Credit', 'Completed', 'Authenticated', 'EXT123456', '123e4567-e89b-12d3-a456-426614174001', 'Visa', 'USD', 'CreditCard', '123e4567-e89b-12d3-a456-426614174000', 'Alice', 'Bob', 1.50, 'MERCHANT123', 'Wells Fargo');

INSERT INTO cardRefund (id, clientId, date, amount, reason, transactionId, cardId, currency, status) VALUES
('123e4567-e89b-12d3-a456-426614174003', 'bilo-testing', '2023-10-16T10:30:00', 20.00, 'Product return', '123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174001', 'USD', 'Processed');
\`\`\`
`;

// console.log(removeMarkdownCodeBlock(rawText));
console.log(removeMarkdownCodeBlock(rawText2));
