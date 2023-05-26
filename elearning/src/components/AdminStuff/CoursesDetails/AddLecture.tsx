import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { addLectureAPI } from "../../../hooks/api";
import { addLectureMutation } from "../../../hooks/mutate";
import { addLecturePropsTest } from "../../Hooks/interfaces";

const AddLecture = ({course_id}: addLecturePropsTest) => {
    const [description, setDescription] = useState<string>('');

    const { mutate: addLecture } = addLectureMutation({ setDescription})
    const addLectureFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            description: description,
            courseCourseId: course_id,
            instructor_id: '5'
        }
        if (description) {
            addLecture(data);
        }
    }

    return (
        <form onSubmit={addLectureFunction}>
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="wuwtl" className="font-medium">Description of the lecture</label>
                    <input name='wwutl' type='text' value={description} className="inputCourseDetails" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex justify-end">
                    <button className="bg-white text-black rounded-lg py-2 px-5">Add</button>
                </div>
            </div>
        </form>
    )
}

export default AddLecture