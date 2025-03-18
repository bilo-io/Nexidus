import axios from "axios";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export async function generateCode(prompt: string): Promise<string | null> {
  try {
    const response = await axios.post(
      OPENAI_ENDPOINT,
      {
        model: "gpt-4", // You can change this to "gpt-3.5-turbo" if needed
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500, // Limit response size
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating code:", error);
    return null;
  }
}
