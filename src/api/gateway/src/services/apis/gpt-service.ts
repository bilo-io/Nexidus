import axios from 'axios'

export const create = async ({
    payload
}: {
    payload: string
}) => {
    const apiKey = process.env.CHAT_GPT_API_KEY;
    const apiUrl = process.env.CHAT_GPT_API_URL;
    const requestUrl = `${apiUrl}/chat/completions` as string 

    try {
        const result = await axios.post(requestUrl, {
            // model: 'gpt-3.5-turbo', // Replace with the appropriate model name
            model: 'gpt-3.5-turbo-0301',
            messages: [{ role: 'user', content: payload }],
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        return result;
    } catch (error) {
        throw error
    }

}

export default {
    create
}