import { MdOutlineOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const LeftSideUI = ({ fakeId, ID, nameOfLecture  }: { fakeId: number, ID: string, nameOfLecture: string}) => {
    const navigate = useNavigate();

    const navigateToProperLesson = (fakeId: number) => {
        navigate(`${fakeId}`)
    }

    return (
        <div className='bg-[#F0F0F0]'  
            onClick={() => navigateToProperLesson(fakeId)}
            >
                <div className={`
                flex border-[0.1px] border-[#C9F1DD] hover:bg-[#daf3e7] 
                hover:text-[#1fbd6e] cursor-pointer transitionOverlay 
                ${parseInt(ID!) == fakeId && 'bg-[#daf3e7]'}`}>
                    <div className='px-6  flex items-center space-x-4'>
                        <div className='inline-block w-5 h-5 border-[2px] border-current  text-[#1fbd6e] rounded-full' />
                        <div className='bg-[#daf3e7] w-0.5 h-full' />
                    </div>
                    <div className='py-4 flex items-center space-x-2'>
                        <div>
                            <MdOutlineOndemandVideo className='h-5 w-5' />
                        </div>
                        <div>
                            <span className='text-sm'>{nameOfLecture}</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default LeftSideUI