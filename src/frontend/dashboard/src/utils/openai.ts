import OpenAI from "openai";

const client = new OpenAI({
    dangerouslyAllowBrowser: true
});


export const generate = async ({
    prompt,
    fake = false
}: {
    prompt: string,
    fake?: boolean
}) => {
    if (fake) {
     return fakeResponse
    };

    const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: prompt || "Write a one-sentence bedtime story about a unicorn.",
            },
        ],
    });
    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
}


const fakeResponse = `
\`\`\`sql
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
\`\`\`
`