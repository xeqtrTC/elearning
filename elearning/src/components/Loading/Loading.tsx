import { ImSpinner9 } from 'react-icons/im'

const Loading = () => {
    return (
        <div className='h-screen fixed top-0 flex justify-center items-center bg-white w-full z-[100]'>
            <ImSpinner9 className='animate-spin w-12 h-12 text-red-500' />
        </div>
    )
    
}

export default Loading