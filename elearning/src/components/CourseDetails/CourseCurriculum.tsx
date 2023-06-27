import { FC, useState } from "react";
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { BsDot } from 'react-icons/bs'
import CourseCurriculumDetails from "./CourseCurriculumDetails";
import { courseDetailsArray, courseDetailsArrayProps, lessonProps } from "../Hooks/interfaces";
import UseContextState from "../../hooks/UseELearningContext";
const CourseCurriculum = ({ lessons, setLessonIdFunction }: courseDetailsArrayProps) => {
    const [showUp, setShowUp] = useState<any>(null);
    const { lessonIDtoBeGiven, setLessonIDtoBeGiven } = UseContextState(); 

    return (
        <div className="py-10 space-y-5">
                {
                    lessons?.map((item: lessonProps) => {
                        const { description, lesson_id, details, } = item
                        return (
                            <div className={`py-10  font-Barlow border-b  border-[#f6f6fb]  px-10 rounded-2xl ${lesson_id === showUp && 'bg-white'}`} key={lesson_id}>
                                <div className="flex justify-between pb-5 cursor-pointer" onClick={() => setShowUp(lesson_id === showUp ? null : lesson_id)} >
                                    <div className="flex flex-col space-y-5">
                                        <span className="font-bold text-2xl">{description}</span>
                                        <span className="text-[#373f49] text-xl">{details?.length} Lectures</span>
                                    </div>
                                <div>
                                    <div className=" border border-[#4c0ffb] p-2 rounded-full cursor-pointer">
                                        {
                                            showUp === lesson_id ? <SlArrowDown className="w-6 h-6 text-[#4c0ffb]" /> : <SlArrowUp className="w-6 h-6 text-[#4c0ffb]" />
                                        }
                                    </div>
                                </div>
                                </div>
                                {
                                    lesson_id === showUp && (
                                        details?.map((item) => {
                                            const { lessonDetail_id, title, lessonId: lessonSecond_id, video_link, lessonDetail_fakeID } = item;
                                            return (
                                                lessonSecond_id === lesson_id && (
                                                    <div className="flex justify-between border-t py-5" key={lessonDetail_id}>
                                                        <div className="flex items-center space-">
                                                            <div>
                                                                <MdOutlineOndemandVideo className="text-[#4c0ffb] w-6 h-6" />
                                                            </div>
                                                            <div className="flex space-3 items-center px-3 text-xl">
                                                                <span className="font-bold ">{title}</span>
                                                                <BsDot className="w-7 h-7" />
                                                                <span>5:04</span>
                                                            </div>   
                                                        </div>
                                                        <div>
                                                            <button className="
                                                            border-[#4c0ffb]
                                                            text-[#4c0ffb] 
                                                            border px-6 py-1.5 
                                                            rounded-lg 
                                                            hover:bg-[#4c0ffb]
                                                            hover:text-white 
                                                            transitionOverlay"
                                                            onClick={() => setLessonIdFunction(lessonDetail_fakeID)}
                                                            >
                                                                PREVIEW
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        })
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default CourseCurriculum