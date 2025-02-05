import axios from 'axios';

const endpointUrl = '/api/gpt'

module.exports = function (app: any) {
    app.get(endpointUrl, async (req: Request, res: Response) => {
        const apiKey = process.env.CHAT_GPT_API_KEY
        const apiUrl = process.env.CHAT_GPT_API_URL;
        // @ts-ignore
        try {
            const response = await axios.get(`${apiUrl}/models`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                }
            })
            // @ts-ignore
            res.status(200).json(response.data)
        } catch (error) {
            console.log('Cauth error:', typeof error)
        }
    })

    app.post(endpointUrl, async (req: Request, res: Response) => {
        // @ts-ignore
        const { message } = req.body;
        const apiKey = process.env.CHAT_GPT_API_KEY;
        const apiUrl = process.env.CHAT_GPT_API_URL;
        const requestUrl = `${apiUrl}/chat/completions` as string;


        console.log(requestUrl)
        try {
            const response = await axios.post(requestUrl, {
                model: 'gpt-3.5-turbo', // Replace with the appropriate model name
                messages: [{ role: 'user', content: message }],
            }, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            // Handle the response and return to the client
            // @ts-ignore
            res.status(201).json(response.data);
        } catch (error) {
            // Handle errors gracefully
            // @ts-ignore
            console.error('Chat GPT API Error:', error.message, error);
            // @ts-ignore
            res.status(500).json({
                error: 'An error occurred while processing the request.',
                // @ts-ignore
                message: error?.message as string,
                // @ts-ignore
                status: error?.response?.status as number
            });
        }
    });
}