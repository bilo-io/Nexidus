import { ICharacter } from "@vision/core"
import { Request, Response } from "express"
import AIService, { AIModel } from '../services/ai/ai-service'

const controller = {
    /**  `GET` rest method, used with `/endpoint`*/
    list: (req: Request, res: Response) => {
        const userId: string = req.params.userId
        let models: AIModel[] = AIService.getModels() as AIModel[]
        res?.send(models).status(200)
    },
    /**  `GET` by `id` rest method, used with `/endpoint/:id` */
    get: (req: Request, res: Response) => {
        const id: string = req.params.id
        let model: AIModel = AIService.getModels(id) as AIModel | null

        if (model === null) {
            res?.status(404)
        } else {
            res?.send(model).status(200)
        }
    },
    getQnA: (req: Request, res: Response) => {
        // TODO: replace with uuid() lib
        const characterId = Math.random()
        const name = req.body.characterName
        const question = req.body.question
        const context = req.body.context

        // const toxicityRating = AIService.getQnA({
        //     question: question as string,
        //     context: context as string,
        // })

        // TODO: store character in DB
        // res?.status(201).send(toxicityRating)
        res?.status(201).send(null)
    },
    /** `POST` rest method, used with `/endpoint` */
    getToxicity: (req: Request, res: Response) => {
        // TODO: replace with uuid() lib
        const characterId = Math.random()
        const name = req.body.characterName
        const userPrompt = req.body.characterPrompt

        const toxicityRating = AIService.getToxicityRating({
            input: userPrompt as string
        })

        // TODO: store character in DB
        res?.status(201).send(toxicityRating)
    },
}

export default controller;