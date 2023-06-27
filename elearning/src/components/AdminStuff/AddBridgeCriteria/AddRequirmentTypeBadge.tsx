import { FormEvent, useState } from "react"
import { addRequirmentTypeMutation } from "../../../hooks/mutate";

const AddRequirmentTypeBadge = () => {
    const [reqType, setReqType] = useState<string>('');
    const { mutate } = addRequirmentTypeMutation();

    const addRequirmentTypeFn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            reqType
        }
        try {
            if (reqType) {
                mutate(data)
                setReqType('');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={addRequirmentTypeFn}>
            <div className="flex flex-col">
                    <label className="labelEdit">Requirment type. If you want to associate with course, name needs to be same as course name</label>
                    <input 
                    type='text' name='imageOfBadge' 
                    value={reqType}
                    className="inputEditUser" onChange={(e) => setReqType(e.currentTarget.value)} />
                    <div className="flex justify-end py-2">
                        <button>Add requirment type</button>
                    </div>
            </div>
        </form>
    )
}

export default AddRequirmentTypeBadge