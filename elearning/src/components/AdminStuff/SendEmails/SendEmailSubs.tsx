import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { sendEmailToSubs } from "../../../hooks/api";
import { sendEmailMutation } from "../../../hooks/mutate";

const SendEmailSubs = () => {
    const [text, setText] = useState<string>('');

    const { mutate: sendEmail } = sendEmailMutation({ setText })
    
    const sendEmailFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            text: text
        }
        sendEmail(data);
    }

    return (
        <div>
            <form onSubmit={sendEmailFunction}>
                <span className="text-2xl font-medium">Send emails to all subscribers!</span>
                <div className="py-5 h-60">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className=" h-full inputAddInstructor resize-none " />
                </div>
                <div className="flex justify-end">
                    <button className="inputEditUserButton">Send email to subscribers</button>
                </div>
            </form>
        </div>
    )
}

export default SendEmailSubs