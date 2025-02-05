// import * as qna from '@tensorflow-models/qna';
// import * as tf from '@tensorflow/tfjs-node';
// import toxicity from '@tensorflow-models/toxicity'

const threshold = 0.9

export const getToxicityRating = async ({
    input
}: {
    /** `input` is an array of strings, i.e. simply sentences to detect toxicity */
    input: string
}) => {
    // const model = await toxicity.load(threshold, [])

    // const sentences = input || [
    //     'Hello there',
    //     'Gay pride',
    //     'Sup my nigga',
    //     'Sup my nigga, good to see you',
    //     'You really suck',
    //     'You are a loser',
    //     'Fuck off',
    // ]

    // const predictions = model.classify(sentences);

    // // `predictions` is an array of objects, one for each prediction head,
    //     // that contains the raw probabilities for each input along with the
    //     // final prediction in `match` (either `false` or `true`).
    //     // If neither prediction exceeds the threshold, `match` is `null`.

    // console.log(predictions);
    // return predictions;
        /*
        prints:
        {
        "label": "identity_attack",
        "results": [{
            "probabilities": [0.9659664034843445, 0.03403361141681671],
            "match": false
        }]
        },
        {
        "label": "insult",
        "results": [{
            "probabilities": [0.08124706149101257, 0.9187529683113098],
            "match": true
        }]
        },
        ...
        */
}

export interface AIModel {
    id: string,
    name: string,
    source: string
}

export const getModels = (id?: string): AIModel | AIModel[] | null => {
    const models: AIModel[] = [
        {
            id: 'tensorflow-models__toxicity',
            name: 'Toxicity',
            source: 'Tensorflow.js'
        }
    ]

    return id ? (models.find((model: AIModel) => model.id === id) || null) : models
}

// Load the model
// let model: qna.QuestionAndAnswer;
// async function loadModel() {
//   model = await qna.load();
// }
// loadModel();

// export const getQnA = async ({ question, context }) => {
//     if (!question || !context) {
//         return {
//             error: 'question and context are required',
//             status: 400
//         };
//   }

//   const answers = await model.findAnswers(question, context);
//     return {
//         data: answers,
//         status: 200
//     };
// }

export default {
    getModels,
    getToxicityRating,
    // getQnA
}