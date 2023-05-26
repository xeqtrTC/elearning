import { FormEvent, useState } from "react"
import { useMutation } from "react-query";
import { addInstructor } from "../../../hooks/api";
import { addInstructorMutation } from "../../../hooks/mutate";
import { addinstructorProps } from "../../Hooks/interfaces"

const AddInstructor = () => {
    const [data, setData] = useState<addinstructorProps>({
        nameOfInstructor: '',
        instructorRole: '',
        descriptionOfInstructor: '',
        biggerDescriptionOfInstructor: '',
        githubLink: '',
        linkedInLink: '',
        twitterLink: '',
        youtubeLink: ''
    })
    const isEveryTrue = [data.nameOfInstructor, data.instructorRole, data.descriptionOfInstructor, data.biggerDescriptionOfInstructor].every(Boolean);
    const handleValueChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setData((prevValue) => ({...prevValue, [name]: value}))
    }
    const { mutate: addInstructor } = addInstructorMutation({ setData })
    const addInstructorFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addInstructor(data);
    }

    return (
        <div>
            <form onSubmit={addInstructorFunction}>
                <div className="adminPanelGrid">
                    <div className="flex flex-col text-[#616161]">
                        <label  className="labelEdit">Name of instructor</label>
                        <input type='text' name='nameOfInstructor' className="inputEditUser" value={data.nameOfInstructor} onChange={handleValueChange} />
                    </div>
                    <div className="flex flex-col text-[#616161]">
                        <label  className="labelEdit">Instructor role</label>
                        <input type='text' name='instructorRole' className="inputEditUser" value={data.instructorRole} onChange={handleValueChange} />
                    </div>
                    <div className="flex flex-col text-[#616161]">
                        <label  className="labelEdit">Description of instructor</label>
                        <input type='text' name='descriptionOfInstructor' className="inputEditUser" value={data.descriptionOfInstructor} onChange={handleValueChange} />
                    </div>
                    <div className="flex flex-col text-[#616161]">
                        <label  className="labelEdit">Bigger description of instructor</label>
                        <textarea className="resize-none inputEditUser h-[10rem]" name="biggerDescriptionOfInstructor" value={data.biggerDescriptionOfInstructor} onChange={handleValueChange} />
                    </div>
                    <div className="flex flex-col text-[#616161]">
                        <div className="flex justify-between">
                            <label  className="labelEdit">Github Link</label>
                            <span className="text-xs font-medium">optional</span>
                        </div>
                        <input type='text' className="inputEditUser" name='githubLink' onChange={handleValueChange} value={data.githubLink} />
                    </div>
                    <div className="flex flex-col text-[#616161]">
                        <div className="flex justify-between">
                            <label  className="labelEdit">LinkedIn Link</label>
                            <span className="text-xs font-medium">optional</span>
                        </div>
                        <input type='text' className="inputEditUser" name='linkedInLink' onChange={handleValueChange} value={data.linkedInLink} />
                    </div>
                    <div className="flex flex-col text-[#616161]">
                        <div className="flex justify-between">
                            <label  className="labelEdit">Twitter Link</label>
                            <span className="text-xs font-medium">optional</span>
                        </div>
                        <input type='text' className="inputEditUser" name='twitterLink' onChange={handleValueChange} value={data.twitterLink}/>
                    </div>
                    <div className="flex flex-col text-[#616161]">
                        <div className="flex justify-between">
                            <label  className="labelEdit">Youtube Link</label>
                            <span className="text-xs font-medium">optional</span>
                        </div>
                        <input type='text' className="inputEditUser" name='youtubeLink' onChange={handleValueChange} value={data.youtubeLink} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button disabled={!isEveryTrue} className='inputEditUserButton'>Add instructor</button>
                </div>
            </form>
        </div>

    )
}

export default AddInstructor