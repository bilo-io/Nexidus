import { Request, Response } from 'express';
export declare function sendMail({ subject, message, sender, }: {
    subject: string;
    message: string;
    sender: string;
}, req: Request, res: Response): void | any;
declare const _default: {
    sendMail: typeof sendMail;
};
export default _default;
