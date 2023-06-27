import { FormEvent, useEffect, useState } from "react";
import { addBadgeCriteriaMutation } from "../../../hooks/mutate";
import { ListRequirmentTypeQuery } from "../../../hooks/query"
import { number } from "zod";
import Loading from "../../Loading/Loading";

const AddBridgeCriteria = () => {
    const [reqType_id, setReqType_id] = useState<number | null>(null)
    const { data, isLoading, isError, isSuccess } = ListRequirmentTypeQuery();
    console.log(reqType_id);
    const { mutate } = addBadgeCriteriaMutation();
    console.log(data);
    const addBadgeCriteriaFn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            reqType_id: reqType_id!
        }
        try {
            mutate(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setReqType_id(data[0].id)
        }
    }, [isSuccess])

    const changeValueOfSelect = (e: FormEvent<HTMLSelectElement>) => {
        setReqType_id(parseInt(e.currentTarget.value))
    }
    let content;

    if (isLoading) {
        content = <Loading />

    }
    if (isSuccess) {
        content = (
            <div className="">
                <form onSubmit={addBadgeCriteriaFn}>
                    <div className="flex flex-col">
                        <label className="labelEdit">List of requirment type</label>
                        <select className="inputEditUser" onChange={changeValueOfSelect} >
                            {
                                data?.map((item) => {
                                    const { id, requirement } = item
                                    return (
                                        <option key={id} value={id} className="text-black py-2">{requirement}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="flex justify-end py-2">
                        <button>Add badge criteria</button>
                    </div>
                </form>
            </div>
        )
    }
   
    return <>{content}</>
}

export default AddBridgeCriteria