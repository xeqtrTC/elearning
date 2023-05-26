import { FormEvent, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { useMutation } from "react-query";
import { whatWillYouBuildAPI } from "../../../hooks/api";
import { addWhatYouBuildMutation } from "../../../hooks/mutate";
import { addLecturePropsTest, whatWillYouBuildPropsTest } from "../../Hooks/interfaces";

const WhatYouBuild = ({ course_id }: addLecturePropsTest) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [wub_data, setWub_data] = useState<whatWillYouBuildPropsTest>({
        title: '',
        description: '',
        course_id: course_id,
    })

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            console.log(e?.currentTarget?.files[0])
            setSelectedImage(e?.currentTarget?.files[0])
        }
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (name === 'title' || name === 'description') {
            setWub_data(prevValue => ({...prevValue, [name]: value}))
        }
    }
    const { mutate: addWYBMutation } = addWhatYouBuildMutation({ setSelectedImage, setWub_data, course_id })
    const addWhatYouBuildFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (selectedImage) {
            formData.append('image', selectedImage as File)
            formData.append('title', wub_data.title as string)
            formData.append('description', wub_data.description as string) 
            formData.append('course_id', course_id as string)   
        }
        addWYBMutation(formData);
    }
    const wubDataBoolean = [wub_data.course_id, wub_data.description, wub_data.title].every(Boolean)

    return (
        <form onSubmit={addWhatYouBuildFunction}>    
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                <div className="flex items-center space-y-2">
                    <label htmlFor="wuwtl" className="font-medium"><BsUpload className="w-7 cursor-pointer h-7" /></label>
                    <span className="ml-2">Upload photo</span>
                    <input id='wuwtl' name='wwutl' type='file' onChange={onChange} className="inputCourseDetails hidden" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-medium">Title</label>
                    <input type='text' name='title' value={wub_data.title} className="inputCourseDetails"  onChange={onChange} />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-medium">Description</label>
                    <input type='text' name='description' value={wub_data.description} className="inputCourseDetails"  onChange={onChange}/>
                </div>
                <div className="flex justify-end">
                    <button className="bg-white text-black rounded-lg py-2 px-5 disabled:cursor-not-allowed" disabled={!wubDataBoolean}>Add</button>
                </div>
            </div>
        </form>
    )
}

export default WhatYouBuild