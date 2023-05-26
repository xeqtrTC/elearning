import { FC, FormEvent, MouseEventHandler, RefObject, useRef } from "react";
import Header from "../Header/Header";
import WhatYouLearn from "./WhatYouLearn";
import WhatYouBuild from "./WhatYouBuild";
import CourseCurriculum from "./CourseCurriculum";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getSingleCourse, purchaseCourseByUser } from "../../hooks/api";
import CourseFirst from "./CourseFirst";
import { whatyoubuildProps, whatyoulearnProps } from "../Hooks/interfaces";
import axios, { AxiosError, isAxiosError } from "axios";
import UseContextState from "../../hooks/UseELearningContext";
import { getCourseDetailsQuery } from "../../hooks/query";
import Loading from "../Loading/Loading";
import DoesntExistPageSecond from "../DoesntExist/DoesntExistPageSecond";
import MeetInstructors from "./MeetInstructors";
import CourseReview from "./CourseReviews";
import CourseFreqQuestion from "./CourseFreqQuestion";
import { purchaseCourseMutation } from "../../hooks/mutate";

const CourseDetails:FC = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const { error, setError, setLessonIDtoBeGiven, lessonIDtoBeGiven } = UseContextState();
    const overviewRef = useRef<HTMLDivElement>(null);
    const curriculumRef = useRef<HTMLDivElement>(null);
    const buildRef = useRef<HTMLDivElement>(null);
    const instructorRef = useRef<HTMLDivElement>(null);
    const FAQsRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);

    const { data, isSuccess, isLoading, isError, error: errorQuery } = getCourseDetailsQuery(name)
    const navigateToRandomRef = (ref: RefObject<HTMLDivElement>) => {
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center'})
        }
    }
    const { mutate: purchaseMutation } = purchaseCourseMutation(); 
    const purchaseCourseFunction = (courseId: number) => {
        console.log(courseId);
        const courseCollection = {
            courseId: courseId
        }
        purchaseMutation(courseCollection);
    }
    const setLessonIdFunction = (lessonSecond_id: number) => {
        setLessonIDtoBeGiven(lessonSecond_id);
        navigate(`/courses/${name}/lectures`)
    }
    console.log(data);
    
    let content;
    if (isLoading) {
        content = (
                <Loading />
            )
        }
    if (errorQuery) {
        content = (
            <DoesntExistPageSecond />
        )
    }   
    if (isSuccess && data) {
        const { 
            description, 
            imageLink, 
            title, 
            course_id,
            lessons, 
            levelOfCourse, 
            whatyoubuild , 
            whatyoulearn, 
            createdAt, 
            updatedAt,
            prerequis,
            courseIncludes,
            freqQuestions,
            instructors,
            overview,
            biggerOverview
            } = data
            content = (
                <div>
                    <CourseFirst prerequisites={prerequis} courseIncludes={courseIncludes} description={description} imageLink={imageLink} instructors={instructors} purchaseCourseFunction={purchaseCourseFunction} courseId={course_id} />
                    <div className="bg-[#DCDDFC]">
                        <div className="w-[70%] m-auto">
                            <ul className="flex space-x-5 h-16 ">
                                <li className="liHover" onClick={() => navigateToRandomRef(overviewRef)}>Overview</li>
                                {
                                    whatyoubuild?.length > 0 && (
                                        <li className="liHover" onClick={() => navigateToRandomRef(buildRef)}>Projects</li>
                                    )
                                }
                                <li className="liHover" onClick={() => navigateToRandomRef(curriculumRef)}>Curriculum</li>
                                <li className="liHover" onClick={() => navigateToRandomRef(instructorRef)}>Instructors</li>
                                <li className="liHover" onClick={() => navigateToRandomRef(reviewRef)}>Reviews</li>
                                <li className="liHover" onClick={() => navigateToRandomRef(FAQsRef)}>FAQs</li>
                            </ul>
                        </div>
                    </div>
                    <div className="py-14 w-[70%] m-auto">
                        <div className="w-[60%] space-y-10" >
                            <div className="space-y-5" ref={overviewRef}>
                                <div className="text-center">
                                    <span className="text-4xl font-bold">Course overview</span>
                                </div>
                                <div className='font-bold'>
                                    <span>{overview}</span>
                                </div>
                            </div> 
                            <div>
                                <WhatYouLearn whatyoulearns={whatyoulearn} />
                            </div>
                            <div className="font-Barlow text-[#373f49] font-medium text-lg flex flex-col">
                                <span>{biggerOverview}</span>
                                <div className="text-center py-5 ">
                                <button className="bg-[#0E111E] hover:bg-[#0E111E]/20 transitionOverlay hover:text-[#0E111E] text-white py-2 px-7 rounded-[14rem]">    
                                    EXPAND OVERVIEW
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        whatyoubuild?.length > 0 && (
                            <div className="bg-black font-Barlow py-20" ref={buildRef}>
                                <div className="w-[70%] m-auto text-white space-y-5 py-5">
                                    <div className="text-center w-[60%] m-auto space-y-3">
                                        <p className="text-center text-3xl font-bold">What you'll build</p>
                                        <p className="font-medium">The best way you learn is by doing. Not just watching endless tutorials. That's why a key part of this course is the real-world projects that you'll get to build. Plus they'll look great on your portfolio.</p>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-5">
                                        {
                                            whatyoubuild?.map((item: whatyoubuildProps) => {
                                                const { 
                                                    courseCourseId,
                                                    createdAt,
                                                    updatedAt,
                                                    wub_description,
                                                    wub_id,
                                                    wub_imageLink,
                                                    wub_title
                                                    } = item
                                                return (
                                                    <WhatYouBuild 
                                                    courseCourseId={courseCourseId} 
                                                    createdAt={createdAt} 
                                                    updatedAt={updatedAt} 
                                                    wub_description={wub_description}
                                                    wub_id={wub_id}
                                                    wub_imageLink={wub_imageLink}
                                                    wub_title={wub_title}
                                                    key={wub_id}
                                                    />
                                                )
                                            })
                                        }

                                    </div> 
                                </div>
                            </div>
                        )

                    }
                    <div ref={reviewRef}>
                        <CourseReview />
                    </div>
                    <div className="bg-[#f6f6fb] py-20 font-Barlow">
                        <div className="w-[70%] m-auto">
                            <div className="text-center w-[60%] m-auto flex flex-col space-y-4">
                                <span className="text-4xl font-bold">Course curriculum</span>
                                <span className="text-[#373f49]">To make sure this course is a good fit for you, you can <strong className="font-bold">start learning to code for free right now</strong> by clicking any of the PREVIEW links below.</span>
                            </div>
                            <div ref={curriculumRef}>
                                <CourseCurriculum lessons={lessons} setLessonIdFunction={setLessonIdFunction}  />
                            </div>
                        </div>
                    </div>
                    <div ref={instructorRef} id='instructorRef'>
                        <MeetInstructors listofinstructors={instructors} />
                    </div>
                    <div ref={FAQsRef}>
                        <CourseFreqQuestion frequentlyAskedQuestions={freqQuestions} />
                    </div>
                </div>
        )
    }
    return <>{content}</>
}

export default CourseDetails