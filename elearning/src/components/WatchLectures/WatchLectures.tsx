import { MdOutlineHome, MdOutlineOndemandVideo } from 'react-icons/md' 
import { FiSettings } from 'react-icons/fi'
import WatchLecturesHeader from './WatchLecturesHeader'
import WatchLecturesVideo from './WatchLecturesVideo'
import WatchLecturesLeftSide from './WatchLecturesLeftSide'
import { useParams } from 'react-router-dom'
import { getCourseDetailsQuery } from '../../hooks/query'
import { useEffect, useState } from 'react'
import DoesntExist from '../DoesntExist/DoesntExist'
import { lessonProps } from '../Hooks/interfaces'
import UseContextState from '../../hooks/UseELearningContext'
const WatchLectures = () => {
    const { name } = useParams();
    const { setLessonIDtoBeGiven, lessonIDtoBeGiven } = UseContextState();
    const [lessonID, setLessonID] = useState<number | undefined>(undefined);
    const [courseId, setCourseId] = useState<number>()
    let currentIndex = 1;
    console.log(name);
    const { data, isSuccess, isLoading, isError } = getCourseDetailsQuery(name)
    console.log(data, 'LESSON ID');
    const forwardLecture = () => {
        data?.lessons.forEach((item: lessonProps) => {
            const nextIndex = (lessonID! + 1) % item?.details?.length!;
            console.log(nextIndex, 'test index');
            // currentIndex = (currentIndex + 1) % item.details.length;
        })
    }

    let content;

    useEffect(() => {
        try {
            if (data && lessonIDtoBeGiven === null) {
                // @ts-ignore
                setLessonID(data?.lessons[0]?.details[0]?.lessonId!)
                setCourseId(data.course_id);
            } else if (data && lessonIDtoBeGiven) {
                setLessonID(lessonIDtoBeGiven);
                setCourseId(data.course_id);
            }
        } catch (error) {
            console.log(error);
        }
    }, [data])
    if (isLoading) {
        content = (
            <p>Loading...</p>
        )
    }
    if (isError) {
        content = (
            <DoesntExist />
        )
    }
    if (isSuccess && data) {
        const { lessons } = data;
        content = (
            <div>
                <WatchLecturesHeader forwardLecture={forwardLecture} />
                <div className='flex'>
                    <div className='max-w-[20rem]  h-screen border border-red-400 overflow-hidden overflow-y-scroll '> 
                        <WatchLecturesLeftSide lessons={lessons} name={name} setLessonID={setLessonID} lessonID={lessonID}   />
                    </div>
                    <div className='flex-1 px-10 py-5'>
                        <WatchLecturesVideo lessonID={lessonID} courseId={courseId} />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
        {content}
        </>
    )
}

export default WatchLectures;