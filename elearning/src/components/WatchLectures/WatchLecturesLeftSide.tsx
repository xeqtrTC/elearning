import { MdOutlineOndemandVideo, MdDone } from "react-icons/md"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { courseDetailsArrayProps, courseDetailsWatchLectures, lessonProps } from "../Hooks/interfaces"
import WatchLecturesLeftSideHolder from "./WatchLecturesLeftSideHolder";

const WatchLecturesLeftSide = ({ lessons, name, setLessonID, lessonID }: courseDetailsWatchLectures) => {

    return (
        <div className='bg-[#f7f7f7] py-5 space-y-5 w-[20rem]'>
            <div className='px-7'>
                <span className='font-bold text-xl'>{name}</span>
            </div>
            {
                lessons.map((item) => {
                    const { description, details, lesson_id, isCompleted, quizz } = item;
                    console.log(quizz, 'aaaaaaaa')
                    const reversedItems = details?.sort((a, b) => a.lessonDetail_id - b.lessonDetail_id)
                    return (
                        <WatchLecturesLeftSideHolder quizz={quizz} 
                        description={description} 
                        details={reversedItems} 
                        isCompleted={isCompleted} 
                        key={lesson_id} 
                        lesson_id={lesson_id} />
                    )
                })
            }
        </div>
    )
}

export default WatchLecturesLeftSide