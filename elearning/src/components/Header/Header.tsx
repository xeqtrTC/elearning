import { useEffect, useState } from 'react'
import { GoThreeBars } from 'react-icons/go'
import HeaderOnMobile from './HeaderOnMobile';
import { AiOutlineClose } from 'react-icons/ai'
import HeaderLinks from './HeaderLinks';
import UseAuthContext from '../../hooks/authUseContext';
import UseAuthHook from '../../hooks/useAuthHook';
import { Link } from 'react-router-dom';

const Header = () => {

    const [showPanel, setShowPanel] = useState<boolean>(false);
    const showPanelFunction = () => {
        setShowPanel(!showPanel);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');      
        const handleResize = () => {
            if (showPanel && mediaQuery.matches === false) {
                setShowPanel(false);
            } else if(!showPanel && mediaQuery.matches === false) {
                setShowPanel(false)
            }
        }
        mediaQuery.addEventListener('change', handleResize);
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
      }, []);

    return (
        <>
        <div className="lg:w-[80%] sm:w-[100%] m-auto  flex py-5 items-center justify-between px-5 md:px-0 ">
            <div>
                <img src='https://cdn.worldvectorlogo.com/logos/next-js.svg' className="w-10 h-10" />
            </div>
            <div className=' hidden md:inline'>
                <HeaderLinks row={true}  />
            </div>
            <div className='md:hidden '>
                {
                    showPanel ? (
                        <div className='relative px-5 flex items-center'>
                            <AiOutlineClose className='w-6 h-6 cursor-pointer absolute  z-[120]' onClick={showPanelFunction} />
                        </div>
                        ) : (
                        <GoThreeBars className='w-6 h-6 cursor-pointer' onClick={showPanelFunction}/>
                    )
                }
                
            </div>    
        </div>   
        {
            showPanel  && (
                <HeaderOnMobile />
            )
        }
        </>
    )
}

export default Header