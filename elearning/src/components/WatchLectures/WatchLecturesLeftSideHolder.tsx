import { MdDone, MdOutlineOndemandVideo } from "react-icons/md";
import { courseDetailsWatchLectures, leftsidePropsVideo } from "../Hooks/interfaces";
import WatchLecturesLeftSideLessonD from "./WatchLecturesLeftSideLessonD";

const WatchLecturesLeftSideHolder = ({ description, isCompleted, details, lesson_id, quizz }: leftsidePropsVideo) => { 
    return (
            <div >
                <div className='bg-[#e8e8e8] py-2 px-5 flex items-center'>
                    <span className='font-bold'>{description}</span>
                    {
                        isCompleted && (
                            <MdDone className="ml-1 text-[#4c0ffb] w-6 h-6" />
                        )
                    }
                </div>
                {
                    details?.map((item) => {
                        const { title, lessonDetail_id, lessonDetail_fakeID, lessonId} = item;
                        return (
                            lessonId === lesson_id && (
                                <WatchLecturesLeftSideLessonD key={lessonDetail_id} title={title} lessonDetail_fakeID={lessonDetail_fakeID}  />
                                )
                            )
                    })
                }
                {
                    quizz?.map((item) => {
                        const { quizzFakeId, quizz_id, quizz_name, lesson_id} = item;
                        return (
                            item.lesson_id === lesson_id && (
                                <WatchLecturesLeftSideLessonD key={quizz_id} title={quizz_name} lessonDetail_fakeID={quizzFakeId} />
                            )
                        )
                    })
                }

                {/* {
                    reversedItems?.map((item) => {
                        const { lessonDetail_id, lessonId: lessonSecondId, title } = item;
                        return (
                            lessonSecondId === lesson_id ? (
                                <div className='bg-[#F0F0F0]  ' key={lessonDetail_id} 
                                // onClick={() => testFunction(lessonDetail_id)}
                                >
                                    <div className={`flex border-[0.1px] border-[#C9F1DD] hover:bg-[#daf3e7] hover:text-[#1fbd6e] cursor-pointer transitionOverlay ${parseInt(id!) == lessonDetail_id && 'bg-[#daf3e7]'}`}>
                                        <div className='px-6  flex items-center space-x-4'>
                                            <div className='inline-block w-5 h-5 border-[2px] border-current  text-[#1fbd6e] rounded-full' />
                                            <div className='bg-[#daf3e7] w-0.5 h-full' />
                                        </div>
                                        <div className='py-4 flex items-center space-x-2'>
                                            <div>
                                                <MdOutlineOndemandVideo className='h-5 w-5' />
                                            </div>
                                            <div>
                                                <span className='text-sm'>{title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        )

                    })
                } */}
            </div>
        )
    }

    export default WatchLecturesLeftSideHolder