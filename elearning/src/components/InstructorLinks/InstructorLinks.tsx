import { AiFillGithub, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { InstructorButtonLinks } from "../Hooks/interfaces";

const InstructorLinks = ({  githubLink, twitterLink, youtubeLink, linkedInLink  }: InstructorButtonLinks) => {

    let githubButton;
    let twitterButton;
    let youtubeButton;
    let linkedInButton;
    const navigateToWebsite = (link: string) => (
        window.location.href = link
    )
    if (githubLink) {
        githubButton = (
            <div className='meetInstructorLinks' onClick={() => navigateToWebsite(githubLink)}>
                <AiFillGithub className='w-5 h-5' />
            </div>
        )
    }
    if (twitterLink) {
        twitterButton = (
            <div className='meetInstructorLinks' onClick={() => navigateToWebsite(twitterLink)}>
                <AiOutlineTwitter className='w-5 h-5' />
            </div>
        )
    } 
    if (youtubeLink) {
        youtubeButton = (
            <div className='meetInstructorLinks' onClick={() => navigateToWebsite(youtubeLink)}>
                <AiFillYoutube className='w-5 h-5' />
            </div>
        )
    }
    if (linkedInLink) {
        linkedInButton = (
            <div className='meetInstructorLinks' onClick={() => navigateToWebsite(linkedInLink)}>
                <FaLinkedinIn  className='w-5 h-5' />
            </div>
        )
    }
    const combinedButtons = (
        <>
        {githubButton}
        {twitterButton}
        {youtubeButton}
        {linkedInButton}
        </>
    )
    return <>{combinedButtons}</>
}

export default InstructorLinks