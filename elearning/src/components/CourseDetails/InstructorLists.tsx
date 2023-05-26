import { AiFillGithub, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai"
import { FaLinkedinIn } from "react-icons/fa"
import { ListInstructorsPropsSecond } from "../Hooks/interfaces"
import InstructorLinks from "../InstructorLinks/InstructorLinks"

const InstructorLists = ({ id, usernameOfInstructor, instructorRole, descriptionOfInstructor, githubLink, twitterLink, youtubeLink, linkedInLink }: ListInstructorsPropsSecond) => {
    return (
        <div className="relative py-20  ">
            <div className="py-5 absolute top-0 px-10">
                <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/person-of-interest/b/b9/Poi_harold_finch.jpg' className="rounded-full w-32 h-32 object-cover top-[-5]" />
            </div>
            <div className="bg-white p-10 rounded-2xl text-black">
                <div className="py-14 flex flex-col">
                    <span className="text-[#4c0ffb] font-medium text-3xl">Hi, I'm {usernameOfInstructor}!</span>
                    <span className="py-2 font-medium">
                        {descriptionOfInstructor}
                    </span>
                </div>
                <div className="py-5">
                    <span className="text-[#4c0ffb] font-medium text-2xl">SEE MY BIO & COURSES</span>
                </div>
                <div className="bg-[#373f49]/10 h-[0.3px]" />
                <div className="py-10 flex flex-col space-y-1">
                    <span className="font-bold text-2xl">{usernameOfInstructor}</span>
                    <span className=" font-normal text-xl">{instructorRole}</span>
                    <div className='flex space-x-2 py-5'>
                        <InstructorLinks twitterLink={twitterLink} githubLink={githubLink} linkedInLink={linkedInLink} youtubeLink={youtubeLink} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorLists