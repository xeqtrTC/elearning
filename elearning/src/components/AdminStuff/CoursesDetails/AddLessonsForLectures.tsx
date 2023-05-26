import { FormEvent, useEffect, useState } from "react"
import { BsUpload } from "react-icons/bs"
import { useMutation, useQuery } from "react-query"
import { getLecturesForCourse, lessonDetailsAPI } from "../../../hooks/api"
import { addLessonDetailsMutation } from "../../../hooks/mutate"
import { getLectureCourse } from "../../../hooks/query"
import { addLecturePropsTest, lectureProps } from "../../Hooks/interfaces"

const AddLessonsForLectures = ({ course_id }: addLecturePropsTest) => {
    const [lessonId, setLessonId] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [title, setTitle] = useState<string>('');
    const [privateLesson, setPrivateLesson] = useState<string>('0');
    const { data } = getLectureCourse(course_id!)
    const changeValueOfLecture = (e: FormEvent<HTMLSelectElement>) => {
        setLessonId(e.currentTarget.value)
    }
    const { mutate: addLessonDetails } = addLessonDetailsMutation({ setTitle, setSelectedFile, setPrivateLesson })
    const uploadFileChange = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setSelectedFile(e.currentTarget.files[0])
        }
    }
    const changePrivate = (e: FormEvent<HTMLSelectElement>) => {
        setPrivateLesson(e.currentTarget.value)
    }
    const addLessonFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(); 
        if( selectedFile) {
            formData.append('title', title );
            formData.append('lessonLessonId', lessonId ? lessonId : '0');
            formData.append('video', selectedFile as File);
            formData.append('privateLesson', privateLesson ? privateLesson : '0')
        }
        addLessonDetails(formData);
    }

    const everyBoolean = [title, selectedFile].every(Boolean);
    useEffect(() => {
        if (data) {
            setLessonId(data[0]?.lesson_id);
        }
    }, [data])

    return (
        <form onSubmit={addLessonFunction}>
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                <div className="flex items-center space-y-2">
                    <select className="text-black py-2 w-full rounded-xl outline-none cursor-pointer" onChange={changeValueOfLecture}> 
                        {
                            data?.map((item: lectureProps) => {
                                const { lesson_id, description } = item;
                                return (   
                                    <option value={lesson_id} key={lesson_id} className='rounded-xl' >{description}</option>
                                    )
                                })
                        }
                    </select>
                </div>
                <div className="flex items-center space-y-2">
                    <label htmlFor="wuwtl" className="font-medium"><BsUpload className="w-7 cursor-pointer h-7" /></label>
                    <span className="ml-2">Upload video</span>
                    <input id='wuwtl' name='wwutl' type='file' className="inputCourseDetails hidden" onChange={uploadFileChange} />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-medium">Title</label>
                    <input type='text' className="inputCourseDetails" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-medium">Private</label>
                    <select  className="text-black py-2 w-full rounded-xl outline-none cursor-pointer" onChange={changePrivate}>
                        <option value='1'>Yes</option>
                        <option value='0'>No</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button className="bg-white text-black rounded-lg py-2 px-5 disabled:cursor-not-allowed" disabled={!everyBoolean}>Add</button>
                </div>
            </div>
        </form>
    )
}

export default AddLessonsForLectures