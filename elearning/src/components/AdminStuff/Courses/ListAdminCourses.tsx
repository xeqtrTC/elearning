import { useQuery } from "react-query"
import { getAllCourses } from "../../../hooks/api"
import { getAllCoursesQuery } from "../../../hooks/query"
import AdminCourseTab from "../../CourseTab/AdminCourseTab"
import { AllCourseDetailsArray, courseArray } from "../../Hooks/interfaces"



const ListAdminCourses = () => {

    const { data, isSuccess, isLoading } = getAllCoursesQuery()

    return ( 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 ">
            {
                data?.map((item: AllCourseDetailsArray) => {
                    const { course_id, createdAt, description, imageLink, levelOfCourse, title, updatedAt, instructors, lessons } = item;
                    return (
                        <div className="md:w-[25rem]" key={course_id}>
                            <AdminCourseTab 
                            course_id={course_id} 
                            createdAt={createdAt} 
                            description={description} 
                            imageLink={imageLink} 
                            levelOfCourse={levelOfCourse} 
                            title={title} 
                            lessons={lessons}
                            updatedAt={updatedAt} 
                            instructors={instructors}
                            />
                        
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListAdminCourses