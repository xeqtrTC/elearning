import { ImSpinner10 } from "react-icons/im"

const LoadingQuizz = () => {
    return (
        <div className='flex justify-center border h-full border-red-600 items-center '>
            <ImSpinner10 className='w-8 h-8 animate-spin text-black ' />
        </div>
    )   
}

export default LoadingQuizz