import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { whatWillYouLearnAPI } from "../../../hooks/api";
import { addWhatYouLearnMutation } from "../../../hooks/mutate";
import { addLecturePropsTest } from "../../Hooks/interfaces";

const AddWhatYouLearn = ({ course_id }: addLecturePropsTest) => {
    const [title, setTitle] = useState<string>('');


    const { mutate: addWYLMutation } = addWhatYouLearnMutation({ setTitle })

    const addWhatYouLearnFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataProps = {
            title: title,
            course_id: course_id
        }
        if (title) {
            addWYLMutation(dataProps)
        }
    }
    
    return (
        <form onSubmit={addWhatYouLearnFunction}>
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="wuwtl" className="font-medium">Title of what will they learn</label>
                        <input name='wwutl' type='text' value={title} onChange={(e) => setTitle(e.target.value)} className="inputCourseDetails" />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-white text-black rounded-lg py-2 px-5">Add</button>
                    </div>
            </div>
        </form>
    )
}

export default AddWhatYouLearn