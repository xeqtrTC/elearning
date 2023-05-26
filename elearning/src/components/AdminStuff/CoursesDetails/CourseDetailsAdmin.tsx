import { FormEvent, useState } from "react"
import { whatWillYouBuildProps, whatWillYouBuildPropsTest, whatYouWantToAddProps } from "../../Hooks/interfaces"
import { BsUpload } from 'react-icons/bs'
import { useParams } from "react-router-dom"
import { useMutation } from "react-query"
import { addLectureAPI, whatWillYouBuildAPI, whatWillYouLearnAPI } from "../../../hooks/api"
import AddLessonsForLectures from "./AddLessonsForLectures"
import AddLecture from "./AddLecture"
import WhatYouBuild from "./WhatYouBuild"
import WhatYouLearn from "./AddWhatYouLearn"
import AddWhatYouLearn from "./AddWhatYouLearn"
import AddQuestion from "./AddQuestion"
import ListQuestion from "./ListQuestion"
import AddIncludes from "./AddIncludes"
import AddPrerequisites from "./AddPrerequisites"

const CourseDetailsAdmin = () => {

    const { course_id } = useParams();

    const [data, setData] = useState<whatYouWantToAddProps>({
        wuwtl: false,
        wwub: false,
        lecture: false,
        lectureFC: false,
        question: false,
        listQuestion: false,
        includes: false,
        prerequisites: false
    })
    const changeValue = (e: FormEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name as keyof typeof data;
        setData(prevData => ({...prevData, [name]: !prevData[name] }))
    }
    let lectureFCButton = null;
    let wwutlButton = null;
    let wwubButton = null;
    let lectureButton = null;
    let questionButton = null;
    let listQuestionButton = null;
    let includesButton = null;
    let prerequisitesButton = null
    if (data.wuwtl) {
        wwutlButton = (
            <AddWhatYouLearn course_id={course_id} />
        )
    }
    if (data.wwub) {
        wwubButton = (
            <WhatYouBuild course_id={course_id} />
        )
    }
    if (data.lecture) {
        lectureButton = (
            <AddLecture course_id={course_id} />
        )
    }
    if (data.lectureFC) {
        lectureFCButton = (
            <AddLessonsForLectures course_id={course_id} />
        )
    }
    if (data.question) {
        questionButton = (
            <AddQuestion course_id={course_id} />
        )
    }
    if(data.listQuestion) {
        listQuestionButton = (
            <ListQuestion />
        )
    }
    if (data.includes) {
        includesButton = (
            <AddIncludes courseId={course_id} />
        )
    }
    if (data.prerequisites) {
        prerequisitesButton = (
            <AddPrerequisites courseId={course_id} />
        )
    }
    const combinedButtons = (
        <>
        {wwutlButton}
        {wwubButton}
        {lectureFCButton}
        {lectureButton}
        {questionButton}
        {listQuestionButton}
        {includesButton}
        {prerequisitesButton}
        </>
    )

    return (
        <div>
            <div>
                <span className="font-medium text-xl">What do you want to add to this course?</span>
            </div>
            <div className="py-5 grid grid-cols-5 gap-5">
                <button name='wuwtl' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.wuwtl ? 'Close what you want to learn' : 'What you want to learn?'}
                </button>
                <button name='wwub' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.wwub ? 'Close what will you build' : 'What will you build'}
                </button>
                <button name='lecture' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.lecture ? 'Close lectures' : 'Lectures'}
                </button>
                <button name='lectureFC' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.lectureFC ? 'Close lectures for category' : 'Lectures for category'}
                </button>
                <button name='question' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.question ? 'Close questions' : 'Add question for course'}
                </button>
                <button name='listQuestion' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.listQuestion ? 'Close questions list' : 'List of questions'}
                </button>
                <button name='includes' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.includes ? 'Close includes for course' : 'Add includes for course'}
                </button>
                <button name='prerequisites' className="bg-black text-white py-2 px-5 rounded-xl font-medium" onClick={changeValue}>
                    {data.prerequisites ? 'Close prerequisites for course' : 'Add prerequisites for course'}
                </button>
            </div>
            <div className="space-y-5">
                {combinedButtons}
            </div>
        </div>
    )
}

export default CourseDetailsAdmin