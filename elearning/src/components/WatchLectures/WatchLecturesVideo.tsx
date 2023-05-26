import { AxiosError } from "axios"
import { MdOutlineOndemandVideo } from "react-icons/md"
import { useQuery } from "react-query"
import { getSingleCourseDetails } from "../../hooks/api"
import DoesntExist from "../DoesntExist/DoesntExist"
import { courseDetailsQueryProps, courseDetailsVideoProps } from "../Hooks/interfaces"
import { useEffect, useState } from "react"


const WatchLecturesVideo = ({ lessonID, courseId  }: courseDetailsQueryProps ) => {
    console.log(lessonID, courseId, 'IDOVI OVI')
    const { data, isSuccess, isLoading, isError, error: errorQuery } = useQuery(['lessonID', {lessonID, courseId}], () => getSingleCourseDetails({lessonID, courseId}), {retry: false})

    console.log(data, isSuccess, isLoading, isError, errorQuery, "OVO JE DATA O VIDEO")
    let content;



    if (isLoading) {
        content = (
            <p>Loading..</p>
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
        content = (
            <div>
                <div className='flex items-center space-x-3 '>
                    <MdOutlineOndemandVideo className='h-5 w-5 object-cover' />
                    <span className='font-bold text-xl'>{data.title}</span>
                </div>
                <div className='mt-5'>
                    <video controls key={data.video_link}>
                        <source src={`http://localhost:5000/image/${data.video_link}`} type='video/mp4' />
                    </video>
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

export default WatchLecturesVideo