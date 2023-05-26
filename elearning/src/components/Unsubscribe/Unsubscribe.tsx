import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import { removeSubscription } from "../../hooks/api";
import { seeEmailByUniqueID } from "../../hooks/query";
import Loading from "../Loading/Loading";

const Unsubscribe = () => {
    const { uniqueID } = useParams();
    const navigate = useNavigate();
    const [successRemoved, setSuccessRemoved] = useState<boolean>(false);
    const { data, isLoading, isError, isSuccess, error } = seeEmailByUniqueID(uniqueID!);
    let content;

    const navigateUserAfterSuccess = () => {
        const timer = setTimeout(() => {
            navigate('/', { replace: true })
            setSuccessRemoved(false);
        }, 3000)
        return () => clearTimeout(timer);
    }

    const removeSubMutation = useMutation(removeSubscription, {
        onSuccess: () => {
            console.log('unsubbed')
            setSuccessRemoved(true);
            navigateUserAfterSuccess();
        }
    })

    const removeSubFunction = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            uniqueID: uniqueID
        }
        removeSubMutation.mutate(data)
    }
    if (isLoading) {
        content = <Loading />
    }
    if (isError) {
        content = (
            <p>Plaese this doesnt wrk</p>
        )
    }
    if (isSuccess) {
        content = (
            <div className="bg-[#F7F8F9] h-screen w-full flex justify-center items-center py-10">
                <div className="bg-white px-10 file:m-auto">
                    {
                        successRemoved ? (
                            <div className="p-5 rounded-xl bg-[#1cd31c] mt-5 text-white text-center">
                                <span className="font-medium">You unsubscribed</span>
                            </div>
                        ) : null
                    }
                    <div className="flex flex-col py-10">
                        <span className="text-[#373f47] font-medium text-xl">Xeqtr Elearning platform</span>
                        <span>{data}</span>
                    </div>
                    <div className="flex flex-col py-10 space-y-5">
                        <span className="text-[#697887]">
                            Click the button below to unsubscribe from all marketing email from Xeqtr.
                        </span>
                        <button className="subOrUnSubButton" onClick={removeSubFunction}>Unsubscribe</button>
                    </div>
                </div>
            </div>
        )
    }
    console.log(data);
    return <>{content}</>
}

export default Unsubscribe