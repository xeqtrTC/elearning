import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { getSingleInstructorQuery } from '../../hooks/query';
import CourseTab from '../CourseTab/CourseTab';
import DoesntExist from '../DoesntExist/DoesntExist';
import InstructorLinks from '../InstructorLinks/InstructorLinks';
import Loading from '../Loading/Loading';

const AboutInstructor = () => {
    const { usernameOfInstructor } = useParams();

    const { data, isSuccess, isError, error, isLoading } = getSingleInstructorQuery(usernameOfInstructor!);
    let content = null;
    if (isLoading) content = <Loading />
    if (isError) {
        content = (
            <p>Opps something went wrong!</p>
        )
    }

    if (isSuccess) {
        const { id, 
            usernameOfInstructor, 
            instructorRole, 
            descriptionOfInstructor, 
            githubLink, 
            linkedInLink, 
            twitterLink,
            youtubeLink, 
            courses } = data!;
        content = (
            <div className=''>
            <div className='responsiveNormal py-20 '>
                <div className="flex justify-center flex-col lg:flex-row w-full">
                        <div className='lg:w-1/3'>
                            <div className='flex justify-center'>
                                <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="w-48 h-48 rounded-full object-cover flex" />
                            </div>
                            <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-5 mt-7">
                                <button className='buttonWithoutHover uppercase'>Courses</button>
                                <button className='meetInstructorLinks flex items-center font-medium uppercase  justify-center  rounded-md'>Othet content <HiOutlineArrowNarrowDown className='ml-1' /></button>
                            </div>
                        </div>
                    <div className='lg:w-2/3 mt-5 lg:mt-0'>
                        <div className='flex flex-col space-y-4'>
                            <span className='font-bold text-5xl '>{usernameOfInstructor}</span>
                            <span className='text-[#373f49] font-medium text-2xl'>{instructorRole}</span>
                            <InstructorLinks twitterLink={twitterLink} youtubeLink={youtubeLink} githubLink={githubLink} linkedInLink={linkedInLink} />
                        </div>
                        <div className='mt-10 break-all'>
                            <span className='text-[#373f49] text-xl'>
                                {descriptionOfInstructor}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col '>
                    <div className='border-b-2 border-[#D9D9D9]/60 py-5 ' >
                        <span className='text-3xl font-bold'>Courses</span>
                    </div>
                    <div className='grid-cols-4 grid'>
                    {
                        courses?.map((item) => {
                            const { course_id, createdAt, description, imageLink,  levelOfCourse, title, updatedAt, lessons, instructors } = item;
                            return (
                                <div className=" space-x-5" key={course_id}>
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
                </div>
            </div>
                
            </div>
        )
    }

    return <>{content}</>
}
export default AboutInstructor