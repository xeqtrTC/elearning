import { Response } from "express";
export const sendResponseSuccess = (numberOfStatus: number, array: any, res: Response) => {
    return res.status(numberOfStatus).json(array);
}

export const sendResponseFailure = (numberOfStatus: number, message: string, res: Response) => {
    return res.status(numberOfStatus).json({ message: message })
}

