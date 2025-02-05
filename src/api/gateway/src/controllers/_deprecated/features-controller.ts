import { Request, Response } from "express"

import { IController } from "../../models/misc"
import { IFeature } from '@vision/core'
// import BlueprintsService from '../services/blueprints-service'

import allFeatures from "../../_data/features"

const endpointUrl = `/api/blueprints`

const controller = {
    list: async (req: Request, res: Response) => {
        res?.send(allFeatures.map((feat: IFeature) => (feat))).status(200)
    },
    get: async (req: Request, res: Response) => {
        res?.send(allFeatures.find((feat: IFeature) => feat.key === req?.params?.id || req?.params?.key)).status(200)
    }
}

export default controller;