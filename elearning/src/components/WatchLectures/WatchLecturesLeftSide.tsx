import { MdOutlineOndemandVideo } from "react-icons/md"
import { useLocation } from "react-router-dom";
import { courseDetailsArrayProps, courseDetailsWatchLectures, lessonProps } from "../Hooks/interfaces"

const WatchLecturesLeftSide = ({ lessons, name, setLessonID, lessonID }: courseDetailsWatchLectures) => {
    
    console.log(lessons);

    const testFunction = (lessonSecondId: number) => {
        setLessonID(lessonSecondId);
    }

    return (
        <div className='bg-[#f7f7f7] py-5 space-y-5 w-[20rem]'>
            <div className='px-7'>
                <span className='font-bold text-xl'>{name}</span>
            </div>
            {
                lessons.map((item) => {
                    const { description, details, lesson_id } = item;
                    const reversedItems = details?.slice().reverse()
                    return (
                        <div key={lesson_id}>
                            <div className='bg-[#e8e8e8] py-2 px-5'>
                                <span className='font-bold'>{description}</span>
                            </div>
                            {
                               reversedItems?.map((item) => {
                                    const { lessonDetail_id, lessonId: lessonSecondId, title } = item;
                                    return (
                                        lessonSecondId === lesson_id ? (
                                            <div className='bg-[#F0F0F0]  ' key={lessonDetail_id} onClick={() => testFunction(lessonDetail_id)}>
                                                <div className={`flex border-[0.1px] border-[#C9F1DD] hover:bg-[#daf3e7] hover:text-[#1fbd6e] cursor-pointer transitionOverlay ${lessonID === lessonDetail_id && 'bg-[#daf3e7]'}`}>
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
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WatchLecturesLeftSide