import { FormEvent, useState } from "react";
import { useMutation } from "react-query"
import { addPrerequisites } from "../../../hooks/api"
import { addPrerequisitesMutation } from "../../../hooks/mutate";
import { addPrerequisitesProps } from "../../Hooks/interfaces";





const AddPrerequisites = ({ courseId }: addPrerequisitesProps) => {
    const [nameOfPrerequisites, setNameOfPrerequisites] = useState<string>('');

    const { mutate: addPreMutation } = addPrerequisitesMutation({ setNameOfPrerequisites })
    const addPrerequisitesFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            nameOfPrerequisites: nameOfPrerequisites,
            courseId: courseId
        }
        if (nameOfPrerequisites) {
            addPreMutation(data);
        }
    }

    return (
        <form onSubmit={addPrerequisitesFunction}>
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="wuwtl" className="font-medium">What you want to include</label>
                    <input 
                    name='nameOfPrerequisites' 
                    type='text' 
                    placeholder='Add prerequisites'
                    value={nameOfPrerequisites} 
                    onChange={(e) => setNameOfPrerequisites(e.target.value)} 
                    className="inputCourseDetails" />
                </div>
                <div className="flex justify-end">
                    <button className="bg-white text-black rounded-lg py-2 px-5">Add</button>
                </div>
            </div>
        </form>
    )
}

export default AddPrerequisites