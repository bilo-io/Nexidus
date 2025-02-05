import axios from 'axios'

const endpointUrl = '/api/stablediffusion'

module.exports = function (app: any) {
    app.post(endpointUrl, async (req: Request, res: Response) => {
        const apiKey = process.env.CHAT_GPT_API_KEY
        const apiUrl = process.env.STABLE_DIFFUSION_API_URL;
        try {
            console.log('SD URL',`${apiUrl}/text2img`)
            const response = await axios.post(`${apiUrl}/text2img`, {
                key: apiKey,
                prompt: 'Goku fighting Vegeta in formal clothing'
            })
            // @ts-ignore
            return res.status(201).json(response.data)
        } catch (error) {
            console.log('API.Error => StableDiffusion', error)
        }
    })
}
