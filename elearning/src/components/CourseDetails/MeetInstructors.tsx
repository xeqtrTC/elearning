import { AiFillGithub, AiOutlineTwitter, AiFillYoutube } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { listInstrucotrsSecondProps, ListInstructorsProps } from '../Hooks/interfaces'
import InstructorLists from './InstructorLists'
const MeetInstructors = ({  listofinstructors }: listInstrucotrsSecondProps) => {
    return (
        <div className="bg-[#4C0FFB] py-10 text-white ">
            <div className="w-[90%] md:w-[70%] m-auto ">
                <div className="flex justify-center w-[90%] md:w-[50%] m-auto">
                    <div className="flex flex-col text-center">
                        <span className="text-4xl font-medium">Meet your instructors</span>
                        <div className="text-center py-5">
                            <span className="font-medium">Your React instructors aren't just experts with years of real-world professional experience. They have been in your shoes. They make learning fun. They make complex topics feel simple. They will motivate you. They will push you. And they go above and beyond to help you succeed.</span>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 w-[100%] md:w-[90%] lg:w-[50%] m-auto'>
                    {
                        listofinstructors?.map((item) => {
                            const { id, usernameOfInstructor, instructorRole, descriptionOfInstructor, githubLink, linkedInLink, twitterLink, youtubeLink } = item;
                            return (
                                <InstructorLists key={id} 
                                usernameOfInstructor={usernameOfInstructor} 
                                instructorRole={instructorRole}
                                descriptionOfInstructor={descriptionOfInstructor}
                                githubLink={githubLink} 
                                linkedInLink={linkedInLink}
                                twitterLink={twitterLink}
                                youtubeLink={youtubeLink}
                                id={id}
                                
                                />
                            )    
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MeetInstructors