import { FcCheckmark } from 'react-icons/fc';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import { verifyTokenQuery } from '../../hooks/query';
import Loading from '../Loading/Loading';
import { useEffect } from 'react';
const VerifyAccountToken = () => {
    const { token } = useParams();
    const { data, isSuccess, isError, error, isLoading} = verifyTokenQuery(token!);
    let content;
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate('/login')
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [isSuccess])

    if (isLoading) {
        content = (
            <Loading />
        )
    }

    if (isError) {
        content = (
            <div>
                <div className='flex justify-center'>
                    <AiOutlineClose className='w-20 h-20 text-red-600' />
                </div>
                <span className='text-2xl px-3'>
                    Your token failed, please check your email if you want to verify your account!
                </span>
                <div className='flex justify-center py-3'>
                    <Link to='/login'>
                        <button className='bg-[#0E111E] text-white font-medium px-5 py-3 rounded-md'>Back to login</button>
                    </Link>
                </div>
            </div>
        )
    }

    if (isSuccess) {
        content = (
            <div>
                <div className='flex justify-center'>
                    <FcCheckmark  className='w-20 h-20'/>    
                </div> 
                <div className='flex flex-col text-center'>
                    <span className='text-2xl px-3'>You verificated your account, login now!</span> 
                    <span className='text-2xl px-3'>{data}</span>
                </div>  
                <div className='flex justify-center py-3'>
                    <Link to='/login'>
                        <button className='bg-[#0E111E] text-white font-medium px-5 py-3 rounded-md'>Back to login</button>
                    </Link>
                </div>
            </div>               
        )
    }

    return (
        <div className='flex justify-center items-center py-10'>
            {content}
        </div>
    )
}

export default VerifyAccountToken