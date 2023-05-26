import { Link } from "react-router-dom";
import { getListAllInstructors } from "../../hooks/query"
import Loading from "../Loading/Loading";

const About = () => {
    const { data, isSuccess, isError, isLoading } = getListAllInstructors();
    let content = null;
    if (isLoading) {
        content = <Loading />
    }
    if (isSuccess) {
        const mappedInstructors = data?.map((item) => {
            const {  id, usernameOfInstructor, instructorRole, descriptionOfInstructor} = item;
            return (
                <div className="relative" key={id}>
                    {/* <div className=" absolute top-0 flex left-20 ">
                        <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="rounded-full w-32 h-32 object-cover top-[-5]" />
                    </div> */}
                    <div className="bg-white p-5 mt-16 rounded-md shadow-xl border  text-black ">
                        <div className="mt-12  flex flex-col text-center ">
                            <span className=" font-medium text-xl">{usernameOfInstructor}</span>
                            <span className="py-2">
                                {instructorRole}
                            </span>
                            <div className="break-all text-left min-h-[10rem] ">
                                <span className="text-[#373f49]">{descriptionOfInstructor}</span>
                            </div>
                            <div className="py-3">
                                <Link to={`/about/instructor/${usernameOfInstructor}`}>
                                    <button className="aboutInstructorButton">View full bio</button>
                                </Link>
                            </div>
                        </div>                           
                    </div>
                </div>  
            )
        })
        content = (
            <div className="flex flex-col">
                <div>
                    <span className="text-xl font-bold">What E learning platform is all about</span>
                </div>
                <div className="py-10 ">
                    <div className="text-center">
                        <span className="text-4xl font-bold">Meet our world class instructors</span>
                    </div>
                    <div className="responsiveWithGrid">                              
                        {
                            mappedInstructors
                        }                                                  
                    </div>
                </div>
            </div>
        )
    }
    return <>{content}</>
}

export default About