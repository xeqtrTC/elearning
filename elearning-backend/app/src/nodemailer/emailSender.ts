import nodemailer from 'nodemailer';
import { emailSender, passwordEmail } from '../config/nodemailer';
import { EmailSubscription } from '../models/index'


const mailSetup = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailSender,
        pass: passwordEmail
    }
})

export const sendMailUponRegister = async (email: string, tokenToBeAdded: string) => {
    const sendMailRegister = {
        from: emailSender,
        to: email,
        subject: "Register on Xeqtr's ELearning platform",
        html:
        `
            You need to click here <a href="http://127.0.0.1:5173/verify-account/${tokenToBeAdded}">Cl09i </a>.       
        `
    }

    mailSetup.sendMail(sendMailRegister, (error, info) => {
        if(info) {
            return;
        } else {
            console.log(error);
        }
    })
}

export const sendEmailUpon = async (email: string, uniqueID: string, text: string) => {
    console.log(email);
    const sendEmailToSubscribers = {
        from: emailSender,
        to: email,
        subject: "Subscribed!",
        html:
        `
            Hello! ${text}, 
            if you want to unsubscribe please click this
            <a href="http://127.0.0.1:5173/unsubscribe/${uniqueID}"><button>UNSUBSCRIBE</button></a>     
        `
    }

    mailSetup.sendMail(sendEmailToSubscribers, (error, info) => {
        if(info) {
            return;
        } else {
            console.log(error);
        }
    })   
}

