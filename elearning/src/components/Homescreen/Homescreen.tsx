import { FC } from 'react';
import UseAuthContext from '../../hooks/authUseContext';
import AutoWords from '../AutoWords/AutoWords';
import Header from '../Header/Header';
import { LinksToImage } from '../Hooks/imageLinks';

const Homescreen:FC = () => {

  const { authStats } = UseAuthContext();
  console.log('AUTH STATS', authStats)
  
    return (
      <div className='md:w-[70%] m-auto text-[#0E111E]'>
          <div className='px-5 py-10 md:px-10 text-center flex flex-col space-y-7 '> 
              <span className='text-4xl md:text-7xl font-bold' >Learn in-demand skills</span>
              <AutoWords />
              <span className='text-xl md:text-2xl font-medium'>The most efficient and supportive way for you to learn in-demand skills, get hired, and advance your career.</span>
              <div className='flex flex-col md:flex-row justify-center items-center  md:space-x-5 '>
                <div>
                  <button className='bg-[#0E111E] text-white px-16 py-5 rounded-[40px]'>JOIN TC ACADEMY</button>
                </div>
                <div className='mt-5 md:mt-0'>
                  <span className='hover:border-b border-[#0E111E] cursor-pointer font-bold'>SEE ALL COURSES</span>
                </div>
              </div>
          </div>
          {/* <div className='py-10'>
            <div className='relative  px-5 h-[40rem]  flex flex-col '>
              <div className=' flex justify-center px-16'>
                <img src={LinksToImage.bigPictureOnLanding}   alt='Photo' className='object-contain  w-[100%] '/>
              </div>
              <div className='absolute w-[30%] h-[20rem] text-black left-0 bottom-10 '> 
                  <img src={LinksToImage.secondLittleOne}   alt='Photo'  className=' object-contain h-5 w-5  left-0' />
              </div>
              <div className='absolute w-[30%] h-[20rem] right-0 bottom-32'> 
                  <img src={LinksToImage.thirdLittleOne}   alt='Photo' className=' object-contain' />
              </div>
              
            </div>
          </div> */}
        </div>
    )
}


export default Homescreen