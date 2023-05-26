import { BsArrowRight } from "react-icons/bs";
import { useQuery } from "react-query";
import { getCoursesForUser } from "../../hooks/api";
import { getCouresForUser } from "../../hooks/query";
import MainCourseTab from "../CourseTab/MainCourseTab";
import { courseArray } from "../Hooks/interfaces";
import LoaderSpinner from "../../UI/LoaderSpinner";

const DashBoard = () => {

    const { data, isSuccess, isLoading } = getCouresForUser();
    let content;

    if (isLoading) {
        content = <LoaderSpinner />
    }
    if (isSuccess) {
        content = (
            <div className="flex justify-between">
                {/* <LoaderSpinner /> */}
                <div className="w-[75%]">
                    <div className="flex justify-between">
                        <div>
                            <span className="text-xl font-medium">My Courses</span>
                        </div>
                        <div className="flex items-center text-[#6B6E79] font-medium">
                            <span>See all</span>
                            <BsArrowRight className="w-5 h-5 ml-3" />
                        </div>
                    </div>
                    <div className="mt-5 flex">
                    <div className="adminPanelGrid">
                            {
                                data?.map((item) => {
                                    const { course_id, createdAt, description, imageLink, levelOfCourse, title, updatedAt, lessons, instructors } = item;
                                    return (
                                        <MainCourseTab
                                        course_id={course_id} 
                                        createdAt={createdAt} 
                                        description={description} 
                                        imageLink={imageLink} 
                                        levelOfCourse={levelOfCourse} 
                                        title={title} 
                                        updatedAt={updatedAt}
                                        key={course_id}
                                        lessons={lessons}
                                        instructors={instructors}
                                        
                                        />
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </div>
                <div className="flex-0 w-[20%] border">
                    acab *
                </div>
            </div> 
        )
    }

    return <>{content}</>
}

export default DashBoard