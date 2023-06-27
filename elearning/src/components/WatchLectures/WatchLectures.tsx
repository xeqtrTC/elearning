import { MdOutlineHome, MdOutlineOndemandVideo } from 'react-icons/md' 
import { FiSettings } from 'react-icons/fi'
import WatchLecturesHeader from './WatchLecturesHeader'
import WatchLecturesVideo from './WatchLecturesVideo'
import WatchLecturesLeftSide from './WatchLecturesLeftSide'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { getCourseDetailsQuery, getCourseDetailsVideosQuery } from '../../hooks/query'
import { FormEvent, useEffect, useState } from 'react'
import DoesntExist from '../DoesntExist/DoesntExist'
import { lessonProps } from '../Hooks/interfaces'
import UseContextState from '../../hooks/UseELearningContext'
import { addLessonDetailsCompletionMutation } from '../../hooks/mutate'
const WatchLectures = () => {
    const { name, id } = useParams();
    console.log('ID', id)
    const navigate = useNavigate();
    const { setLessonIDtoBeGiven, lessonIDtoBeGiven } = UseContextState();
    const [lessonID, setLessonID] = useState<number | undefined>(undefined);
    const [courseId, setCourseId] = useState<number>()
    const [testacab, settestacab] = useState<boolean>(false);
    const { data, isSuccess, isLoading, isError } = getCourseDetailsVideosQuery(name)
    const { mutate: lessonCompleteMutation } = addLessonDetailsCompletionMutation();
    console.log(data);
    const forwardLecture = ({forwards, backwords, e}: 
        {
            forwards: boolean, 
            backwords: boolean,
            e?: FormEvent<HTMLDivElement>
        }) => {
            e?.preventDefault()

        try {
            const filterItemsById = data?.map((item) => item.details.find((item) => {
                return item.lessonDetail_fakeID === parseInt(id!)
            })).filter((item) => item?.lessonDetail_fakeID === parseInt(id!));
            const filterQuizz = data?.map((item) => item.quizz.find((item) => {
                return item.quizzFakeId === parseInt(id!)
            })).filter((item) => item?.quizzFakeId === parseInt(id!));    
            console.log(filterQuizz);
            if (filterQuizz!.length > 0 ) {
                const asese = data?.map((item) => item.quizz.map((item) => item.quizz_id));
                const abas = data?.map((item) => item.quizz.map((item) => {
                    return item.quizz_id
                }))
                const nextQuizzIndex = filterQuizz![0]?.quizz_id! + 1
                const findQuizz = data?.map((item) => item.quizz.find((item) => {
                    return item.quizz_id === nextQuizzIndex
                })).filter((item) => item?.quizz_id === nextQuizzIndex)
                console.log(findQuizz, 'aaaaaaaaaaaaaaaaaaaaa')
                if (findQuizz?.length! - 1) {
                   console.log('ua', filterQuizz![0]?.lesson_id)
                    const findproperlesson = data?.find((item) => item.lesson_id === filterQuizz![0]?.lesson_id);
                    const nextproperlesson = findproperlesson?.lesson_id! + 1;
                    const findlessaaaaaas = data?.find((item) => item.lesson_id === nextproperlesson);
                    const giveproper = findlessaaaaaas?.details[0].lessonDetail_fakeID!
                    console.log(nextproperlesson, findlessaaaaaas, giveproper);
                    navigate(`${giveproper}`);
                    return;
               }
                const tonavi = findQuizz![0]?.quizzFakeId
                navigate(`${tonavi}`)
                return
            }        
            const nextIndex = filterItemsById![0]?.lessonDetail_id! + 1;
            const prevIndex = filterItemsById![0]?.lessonDetail_id! - 1;
            const findProperArray = data?.find((item) => item.details.find((item) => {
                return item.lessonId === filterItemsById![0]?.lessonId
            }))
            console.log(findProperArray);
            const nextarr = findProperArray?.details.find((item) => {
                return item.lessonDetail_id === nextIndex
            });
            console.log(nextarr, findProperArray);
            if (nextarr === undefined) {
                console.log('AAAAAAAAAAAAAAAAAAAA')
                const findproperases = filterItemsById![0]?.lessonId;
                const findproperlessontobeadded = data?.find((item) => item.lesson_id === findproperases);
                console.log(findproperlessontobeadded)
                const findproperqq = findproperlessontobeadded?.quizz[0].quizzFakeId;
                navigate(`${findproperqq}`)
                return;
                const firstquizz = findProperArray?.quizz[0].quizz_id;
               
            }
            if (filterItemsById!.length > 0) {
                console.log('usao')
                if (forwards) {
                    console.log('usao')
                    const findNextItemInArray = data?.map((item) => item.details.find((item) => {
                        return item.lessonDetail_id === nextIndex
                    })).filter((item) => item?.lessonDetail_id === nextIndex);
                    if (filterItemsById![0]?.lessonCompletion === null) {
                        const data = {
                            lessonDetail_id: filterItemsById![0]?.lessonDetail_id
                        }
                        lessonCompleteMutation(data)
                    }
                    if (findNextItemInArray?.length! - 1) {
                        const mappedQuizz = data?.filter((item) => {
                            return item.lesson_id === filterItemsById![0]?.lessonId
                        })
                        const toNavigate = mappedQuizz![0].quizz[0].quizzFakeId
                        // console.log(mappedQuizz[0].quizz[0].quizzFakeId)
                        navigate(`${toNavigate}`)
                        return;
                    }   
                    const toNavigate =  findNextItemInArray![0]?.lessonDetail_fakeID
                    navigate(`${toNavigate}`)
                    return;
                } else if (backwords) {
                    const findPrevItemInArray = data?.map((item) => item.details.find((item) => {
                        return item.lessonDetail_id === prevIndex
                    })).filter((item) => item?.lessonDetail_id === prevIndex);    
                    if (findPrevItemInArray?.length! - 1) {
                        return;
                    }   
                    const toNavigate =  findPrevItemInArray![0]?.lessonDetail_fakeID
                    navigate(`${toNavigate}`)
                    
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    } 

    let content;
    // useEffect(() => {
    //     try {
    //         if (data && lessonIDtoBeGiven === null) {
    //             // @ts-ignore
    //             setLessonID(data?.lessons[0]?.details[0]?.lessonId!)
    //             setCourseId(data.course_id);
    //         } else if (data && lessonIDtoBeGiven) {
    //             setLessonID(lessonIDtoBeGiven);
    //             setCourseId(data.course_id);

    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [data])
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
        content = (
            <div>
                <WatchLecturesHeader forwardLecture={forwardLecture} />
                <div className='flex'>
                    <div className='max-w-[20rem]  h-screen border border-red-400 overflow-hidden overflow-y-scroll '> 
                        <WatchLecturesLeftSide lessons={data} name={name} setLessonID={setLessonID} lessonID={lessonID}   />
                    </div>
                    <div className='flex-1 px-10 py-5'>
                        { !id && 'Please select'}
                        <Outlet  />
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