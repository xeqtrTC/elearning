import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { addSubscribeEmail } from "../../hooks/api";

const SubscribeInput = () => {
    const [email, setEmail] = useState<string>('');
    
    const sendEmailMutation = useMutation(addSubscribeEmail, {
        onSuccess: () => {
            console.log('radi')
            setEmail('');
        }
    })
    const sendEmailFunction = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            email: email
        }
        if (email) {
            sendEmailMutation.mutate(data);
        }
    }

    return (
        <div className="py-5">
            <div className="shadow-lg p-10 grid lg:grid-cols-2 bg-white rounded-2xl space-y-5 md:space-y-0 gap-3 items-center">
                <div className="flex flex-col">
                    <span className="font-medium text-2xl">Subscribe to get notified of new courses and special offers</span>
                    <span className="text-[#636363] text-sm font-medium md:inline-block hidden">No spam ever, unsubscribe anytime.</span>
                </div>
                <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
                    <input type='text' onChange={(e) => setEmail(e.currentTarget.value)} value={email} className="border w-full rounded-[30px] outline-none px-5 py-3 " placeholder="Email" />
                    <button onClick={sendEmailFunction} className="subOrUnSubButton">subscribe</button>
                    <span className="text-[#636363]  text-sm font-medium md:hidden">No spam ever, unsubscribe anytime.</span>

                </div>
            </div>
        </div>
    )
}

export default SubscribeInput