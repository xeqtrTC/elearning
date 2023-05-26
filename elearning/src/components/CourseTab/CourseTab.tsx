import { FC } from "react";
import { LinksToImage } from "../Hooks/imageLinks";
import { CiTimer } from 'react-icons/ci';
import { BsDot } from 'react-icons/bs'
import { AllCourseDetailsArray, courseArray, courseDetailsArray } from "../Hooks/interfaces";
import { Link } from "react-router-dom";
import UseContextState from "../../hooks/UseELearningContext";

const CourseTab = ({ course_id, createdAt, description, imageLink, levelOfCourse, title, updatedAt, lessons, instructors }: AllCourseDetailsArray) => {
    const { showYoutubeVideo, setShowYoutubeVideo } = UseContextState();
    const showVideoFunction = () => {
        setShowYoutubeVideo(true);
    }
    return (
            <div className=" shadow-xl">
                <div className="relative z-20">
                    <div>
                        <img src={LinksToImage.webDeveloperLink} />
                    </div>
                    <div className="absolute top-0 right-0 p-2">
                        <span className="bg-[#15D642] py-1 px-4 text-white rounded-sm font-medium">{levelOfCourse.toUpperCase()}</span>
                    </div>
                </div>
                <div className="p-5 space-y-3">
                    <div>
                        <span className="font-bold"><Link to={`/courses/${title}`}>{title}</Link></span>
                    </div>
                    <div className="flex text-sm text-[#6B6E79]">
                        <div className="flex items-center">
                            <CiTimer className="w-5 h-5 text-[#4C10FB]"/>
                            <span className="px-2">40 Hours</span>
                        </div>
                        <div className="flex items-center">
                            <BsDot className="w-5 h-5 text-[#4C10FB]" />
                            <span className="px-1">{lessons?.length} Lessons</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-[#6B6E79]">{description}</span>
                    </div>
                    <div className="flex items-center text-[#6B6E79]">
                        <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="rounded-full w-10 h-10 object-cover" />
                        <span className="px-3">Bosko Bezarevic</span>
                    </div>
                    <div className="flex text-white justify-between space-x-2">
                        <button className="bg-[#0E111E] w-[50%] py-2 font-medium rounded-lg" onClick={showVideoFunction}>WATCH PREVIEW</button>
                        <button className="bg-[#0E111E] w-[50%] py-2 font-medium rounded-lg">COURSE DETAILS</button>
                    </div>
                </div>
            </div>
    )
}

export default CourseTab