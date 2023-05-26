import { FiSettings } from 'react-icons/fi'
import { MdOutlineHome, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { getCourseDetailsQuery } from '../../hooks/query';
import { watchLecturesProps } from '../Hooks/interfaces';
 


const WatchLecturesHeader = ({ forwardLecture }: watchLecturesProps) => {

    return (
        <div className='flex'>
            <div className='border w-[20rem] border-[#e8e8e8]  flex justify-between'>
                <div className='hover:bg-[#32dd88] hover:text-white cursor-pointer px-3 py-3'>
                    <MdOutlineHome  className='w-7 h-7'/>
                </div>
                <div className='hover:bg-[#32dd88] hover:text-white cursor-pointer px-3 py-3'>
                    <FiSettings className='w-7 h-7 ' />
                </div>
            </div>
            <div className='border flex border-[#e8e8e8] flex-1'>
                <div className='w-[50%] 
                    py-3 text-black 
                    hover:bg-[#32dd88]
                    hover:text-white 
                    cursor-pointer 
                    transitionOverlay 
                    flex items-center 
                    justify-center 
                    hover:border-r-[1px]
                    border-[#e8e8e8]'
                    >
                        <MdOutlineKeyboardArrowLeft className='h-6 w-6' />
                        <span>Previous lesson</span>
                </div>
                <div className='w-[50%] flex items-center justify-center bg-[#32dd88] text-white cursor-pointer' onClick={forwardLecture}>
                    <span>Complete and Continue</span>
                        <MdOutlineKeyboardArrowRight className='h-6 w-6' />
                </div>
            </div>
        </div>
    )
}

export default WatchLecturesHeader