import { BsDot } from "react-icons/bs"
import { CiTimer } from "react-icons/ci"
import { Link } from "react-router-dom"
import { LinksToImage } from "../Hooks/imageLinks"
import { AllCourseDetailsArray, courseArray } from "../Hooks/interfaces"

const AdminCourseTab = ({ course_id, createdAt, description, imageLink,  levelOfCourse, title, updatedAt, instructors, lessons }: AllCourseDetailsArray) => {
    return (
        <div className=" p-3">
            <div className=" shadow-xl">
                <div className="relative">
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
                            <span className="px-1">401 Lessons</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-[#6B6E79]">{description}</span>
                    </div>
                    <div className="flex items-center text-[#6B6E79]">
                        <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="rounded-full w-10 h-10 object-cover" />
                        <span className="px-3">Bosko Bezarevic</span>
                    </div>
                    <div className="flex text-white justify-center space-x-2">
                        <Link to={`/homepage/courses/${course_id}`}>
                            <button className="bg-[#0E111E] w-full py-2 px-3 font-medium rounded-lg">Change this course</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCourseTab