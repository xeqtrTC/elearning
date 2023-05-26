import { FormEvent, useState } from "react"
import { useMutation } from "react-query";
import { addCourseIncludes } from "../../../hooks/api";
import { addIncludeMutation } from "../../../hooks/mutate";
import { addIncludeProps } from "../../Hooks/interfaces";

const AddIncludes = ({ courseId }: addIncludeProps) => {
    const [nameOfInclude, setNameOfInclude] = useState<string>('');

    const { mutate: addInclude } = addIncludeMutation({ setNameOfInclude });
    const addIncludeFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            nameOfInclude: nameOfInclude,
            courseId: courseId
        }
        if (nameOfInclude) {
            addInclude(data)
        }
    }

    return (
        <form onSubmit={addIncludeFunction}>
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="wuwtl" className="font-medium">What you want to include</label>
                    <input 
                    name='nameOfInclude' 
                    type='text' 
                    value={nameOfInclude} 
                    onChange={(e) => setNameOfInclude(e.target.value)} 
                    className="inputCourseDetails" />
                </div>
                <div className="flex justify-end">
                    <button className="bg-white text-black rounded-lg py-2 px-5">Add</button>
                </div>
            </div>
        </form>
    )
}

export default AddIncludes