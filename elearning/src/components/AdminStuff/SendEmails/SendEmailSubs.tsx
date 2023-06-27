import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { sendEmailToSubs } from "../../../hooks/api";
import { sendEmailMutation } from "../../../hooks/mutate";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const SendEmailSubs = () => {
    const [text, setText] = useState<string>('');

    const sendEmailSchema: ZodType<{ text: string }> = z.object({
        text: z.string().nonempty()
    })

    const { register, handleSubmit } = useForm<{text: string}>({ resolver: zodResolver(sendEmailSchema)})
    const { mutate: sendEmail } = sendEmailMutation({ setText })
    
    const sendEmailFunction = (data: { text: string }) => {
        sendEmail(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(sendEmailFunction)}>
                <span className="text-2xl font-medium">Send emails to all subscribers!</span>
                <div className="py-5 h-60">
                    <textarea {...register('text')} className=" h-full inputAddInstructor resize-none " />
                </div>
                <div className="flex justify-end">
                    <button className="inputEditUserButton">Send email to subscribers</button>
                </div>
            </form>
        </div>
    )
}

export default SendEmailSubs