import { AxiosError } from "axios"
import { MdOutlineOndemandVideo } from "react-icons/md"
import { useQuery } from "react-query"
import { getSingleCourseDetails } from "../../hooks/api"
import DoesntExist from "../DoesntExist/DoesntExist"
import { courseDetailsQuery, courseDetailsQueryProps, courseDetailsVideoProps, quizzProps } from "../Hooks/interfaces"
import { FormEvent, useEffect, useState } from "react"
import { addLessonDetailsCompletionMutation } from "../../hooks/mutate"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import WatchQuizz from "./Quizz/WatchQuizz"


const WatchLecturesVideo = () => {
    const { id } = useParams();
    console.log(id);
    // console.log(lessonID, courseId, 'IDOVI OVI')
    const { data, isSuccess, isLoading, isError, error: errorQuery } = useQuery(['lessonID', id], () => getSingleCourseDetails(id!), {retry: false})
    const { mutate: lessonCompleteMutation } = addLessonDetailsCompletionMutation();
    let content;

    const addLessonDetailsCompletionFn = ({e, lessonDetail_id}: {e:FormEvent<HTMLButtonElement>, lessonDetail_id: number}) => {
        e.preventDefault();
        const data = {
            lessonDetail_id: lessonDetail_id
        }
        try {
            console.log('ovo mozda,', data)
            lessonCompleteMutation(data)
        } catch (error: any) {
            console.log(error);
        }
    }

    if (isLoading) {
        content = (
            <Loading />
        )
    }

    if (isError) {
        const errorMessage = (errorQuery as AxiosError)
        const errorNotAllowed = errorMessage.response?.status
        content = (
            <DoesntExist errorNotAllowed={errorNotAllowed} />
        )
    }



    if (isSuccess) {
        let quizzOrVideo = null;
        if ('lessonDetail_id' in data) {
            const dataDetail = data as unknown as courseDetailsQuery
            const lessonDetail_id = dataDetail.lessonDetail_id
            quizzOrVideo = (
                <div>
                    <div className='flex items-center space-x-3 '>
                        <MdOutlineOndemandVideo className='h-5 w-5 object-cover' />
                        <span className='font-bold text-xl'>{dataDetail.title}</span>
                    </div>
                    <div className='mt-5'>
                        <video controls key={dataDetail.video_link}>
                            <source src={`http://localhost:5000/image/${dataDetail.video_link}`} type='video/mp4' />
                        </video>
                    </div>
                    <div className="py-3 flex justify-end px-5">
                        {
                            dataDetail.isCompleted ? (
                                <button className="bg-[#4c0ffb] p-2 rounded-lg text-white font-medium cursor-pointer" >Completed</button>
                            ) : (
                                <button className="bg-[#4c0ffb] p-2 rounded-lg text-white font-medium cursor-pointer" onClick={(e) => addLessonDetailsCompletionFn({lessonDetail_id, e})}>Mark as completed</button>
                            )
                        }
                    </div>
                </div>
            )
        } else if ('quizz_name' in data) {
            const quizzValue = data as unknown as quizzProps

            quizzOrVideo = (
                <WatchQuizz quizz={quizzValue}  />
            )
        }
        content = (
            <div className="h-full ">
                {quizzOrVideo}
            </div>
        )
    }

    return (
        <>
        {content}
        </>
    )
}

export default WatchLecturesVideo