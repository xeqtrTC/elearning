import { BsDot } from "react-icons/bs"
import { CiTimer } from "react-icons/ci"
import { HiOutlineComputerDesktop } from "react-icons/hi2"
import { IoCalendarOutline } from "react-icons/io5"
import { MdOutlineAssignment, MdPlayArrow } from "react-icons/md"
import { RiArrowLeftSLine } from "react-icons/ri"
import UseContextState from "../../hooks/UseELearningContext"
import { LinksToImage } from "../Hooks/imageLinks"
import { courseFirstDetails } from "../Hooks/interfaces"
import ShowError from "../ShowError/ShowError"
import ReactPlayer from 'react-player'
import { boolean } from "zod"
import { useRef, useState } from "react"
import CourseFirstItem from "./CourseFirstItem"


const CourseFirst = ({ prerequisites, courseIncludes, description, imageLink, purchaseCourseFunction, courseId, instructors}: courseFirstDetails) => {
    const [ showTrailerVideo, setTrailerVideo ] = useState<boolean>(false);
    const { error } = UseContextState();

    let videoButton;
    if (showTrailerVideo) {
        videoButton = (
            <div className="">
                <ReactPlayer url={'http://localhost:5000/image/Grand%20Theft%20Auto%20%20San%20Andreas%202023.01.19%20-%2000.32.28.04.DVR_Trim.mp4'} controls={true} height='100%' width='100%' />
            </div>
        )
    } else {
        videoButton = (
            <div onClick={() => setTrailerVideo(true)}>
                <img src={LinksToImage.webDeveloperLink} />
                    <div className="absolute bottom-0 p-6 cursor-pointer">
                        <div className=" bg-white rounded-full p-5">
                            <MdPlayArrow className="text-[#0E111E] w-10 h-10 " />
                        </div>
                    </div>
            </div>
        )
    }
    const instructorCount = instructors.length;
    const instructorsArray = instructors.map((item) => item.usernameOfInstructor)
    const instructorsToString = instructorsArray.join(instructorCount > 1 ? ' & ' : ' ')  
    const combinedButtons = (
        <>
        {videoButton}
        </>
    )
    
    return (
        <div className="bg-[#0E111E] relative">
            <div className="w-[90%] md:w-[70%] m-auto text-white py-10 flex flex-col md:flex-row justify-between">
                <div className="w-[90%] md:w-[60%] space-y-5">
                    <div  className="flex items-center">
                        <RiArrowLeftSLine className="w-8 h-8" />
                        <span className="font-medium">BACK TO COURSES</span>
                    </div>
                    <div>
                        <span className="text-4xl font-bold">The Complete Web Developer in 2023</span>
                    </div>
                    <div>
                        <span>{description}</span>
                    </div>
                    <div>
                        <span>You'll learn HTML, CSS, JavaScript, React, Node.js, Machine Learning, and much more.</span>
                    </div>
                    <div className="flex flex-col items-center md:flex-row  py-5 md:py-0">
                        <div className="flex items-center" >
                            <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="w-10 h-10 bg-white p-0.5 rounded-full object-cover" />
                            <div className="ml-2">
                                <span className="mr-2">Taught by:</span>
                                <span> {instructorsToString}</span>
                            </div>            
                        </div>
                        <div className="flex items-center md:px-5">  
                            <IoCalendarOutline className="w-7 h-7" />
                            <span className="px-3 text-sm">Last updated: March 2023</span>
                        </div>
                    </div>
                    
                </div>
                <div className="w-[90%] relative md:w-[35%]">
                    <div className=" relative text-[#0E111E]">
                        <div className="absolute">
                            <div className="relative ">
                                {combinedButtons}    
                            </div>
                            <div className="bg-white shadow-xl p-5 space-y-5">
                                <div className="text-center">
                                    <span className="text-2xl font-bold">Join 1,000,000+ students enrolled in ZTM courses!</span>
                                </div>
                                <button 
                                className="bg-[#0E111E] w-full py-5 rounded-[14rem] text-white font-medium text-xl" 
                                onClick={() => purchaseCourseFunction(courseId)}>
                                    ADD THIS COURSE
                                </button>
                                { error && <ShowError error={error} /> }
                                <div className="h-[1px] bg-[#D9D9D9]" />
                                <div className="text-center">
                                    <span className="font-bold text-xl">This course includes:</span>
                                </div>   
                                <div className="text-[#373f49] text-sm space-y-1">
                                    {
                                        courseIncludes?.map((item) => {
                                            const { id, nameOfInclude} = item
                                            return (
                                                <CourseFirstItem key={id} nameOfNeeded={nameOfInclude} />
                                            )
                                        })
                                    }                                  
                                </div> 
                                <div className="h-[1px] bg-[#D9D9D9]" />
                                    <div className="text-center">
                                        <span className="font-bold text-2xl">Prerequisites</span>
                                    </div>

                                    <div className="text-[#373f49] text-sm space-y-1">
                                        {
                                            prerequisites?.map((item) => {
                                                const {id, nameOfPrerequisites} = item;
                                                return (
                                                    <CourseFirstItem key={id} nameOfNeeded={nameOfPrerequisites} />
                                                )
                                            })
                                        }
                                    </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>                     
    )
}

export default CourseFirst