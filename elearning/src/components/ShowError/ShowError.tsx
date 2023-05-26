import { FC } from "react";
import { errorString } from "../Hooks/interfaces";

const ShowError: FC<errorString> = ({error}: errorString) => {
    return (
        <div className='bg-[#F7CAB7] py-3 rounded-md text-white font-medium text-center'>
            <span>{error}</span>
        </div>
    )   
}

export default ShowError