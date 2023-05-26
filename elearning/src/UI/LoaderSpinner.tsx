import { ImSpinner10 } from 'react-icons/im'
const LoaderSpinner = () => {
    return (
        <div className='flex justify-center h-full items-center w-full  '>
            <ImSpinner10 className='w-8 h-8 animate-spin text-blue-600 ' />
        </div>
    )
}

export default LoaderSpinner