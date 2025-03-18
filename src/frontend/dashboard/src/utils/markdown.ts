export function removeMarkdownCodeBlock(text: string): string {
    return text.replace(/^```[\w]*\n/, '').replace(/\n```$/, '');
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

console.log(removeMarkdownCodeBlock(rawText));
