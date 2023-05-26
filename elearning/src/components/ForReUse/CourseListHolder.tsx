import CourseTab from "../CourseTab/CourseTab";
import { CourseListHolderProps, singleCourseNormalProps } from "../Hooks/interfaces"

const CourseListHolder = ({data}: CourseListHolderProps ) => {
    
    return (
        <div className="responsiveGrid py-5">
            {
                data?.map((item) => {
                    const { course_id, createdAt, description, imageLink, levelOfCourse, title, updatedAt, lessons, instructors } = item;
                    return (
                        <div className="space-x-5" key={course_id}>
                            <CourseTab
                                course_id={course_id}
                                createdAt={createdAt}
                                description={description}
                                imageLink={imageLink}
                                levelOfCourse={levelOfCourse}
                                title={title}
                                instructors={instructors}
                                updatedAt={updatedAt}
                                lessons={lessons}                                                
                                />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CourseListHolder;