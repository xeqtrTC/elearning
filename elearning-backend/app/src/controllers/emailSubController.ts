import { Request, Response } from 'express';
import { EmailSubscription } from '../models/index'
import { v4 } from 'uuid';
import { sendEmailUpon } from '../nodemailer/emailSender';
import { sendResponseSuccess, sendResponseFailure } from '../middleware/responses';
import { emailSubAttributes } from '../models/emailSubscription.model';

export const subscribeToEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const toBeAdded: emailSubAttributes = {
        emailOfSub: email,
        uniqueID: v4()
    }
    try {
        await EmailSubscription.create(toBeAdded);
        return sendResponseSuccess(200, 'Subbed', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const sendEmailToSubscribersPromise = async (text: string) => {
    return new Promise(async(resolve, reject) => {
        try {
            const allSubscribers: emailSubAttributes[] =  await EmailSubscription.findAll();
            if (allSubscribers) {
                for (const values of allSubscribers) {
                    const email = values.emailOfSub;
                    const uniqueId = values.uniqueID
                    sendEmailUpon(email, uniqueId, text)
                    resolve(true);
                }
            }     
            return reject({ message: "There isn't any subscriber"});           
        } catch (error: any) {
            return reject(error.message)
        }   
    })
}

export const sendEmailToSubscribers = async (req: Request, res: Response) => {
    const { text } = req.body;   
   try {
        await sendEmailToSubscribersPromise(text);
        return sendResponseSuccess(200, "You sent emails!", res)
   } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
   }
}

export const getEmailByUniqueID = async (req: Request, res: Response) => {
    const uniqueID = req.params.uniqueID;
    try {
        const correctEmail: emailSubAttributes | null = await EmailSubscription.findOne({
            where: {
                uniqueID: uniqueID
            }
        })
        if (correctEmail) {
            const email = correctEmail.emailOfSub;
            const maskedEmail  = email.replace(/....(?=@)/, '****');
            return sendResponseSuccess(200, maskedEmail, res)
        }
        return sendResponseFailure(404, 'Something went wrong!', res)
    } catch (error: any) {
        return sendResponseFailure(404, error.message, res)
    }
}

export const removeSubscription = async (req: Request, res: Response) => {
    const { uniqueID } = req.body;
    try {
        const correctEmailForDelete = await EmailSubscription.findOne({
            where: {
                uniqueID: uniqueID
            }
        })
        if (correctEmailForDelete) {
            correctEmailForDelete.destroy()
            return sendResponseSuccess(200, 'Sub deleted', res)
        }
        return sendResponseFailure(404, 'Doesnt exist', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}
