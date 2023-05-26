import { BsDot } from "react-icons/bs"
import { courseFirstITemProps } from "../Hooks/interfaces"

const CourseFirstItem = ({ nameOfNeeded }: courseFirstITemProps) => {
    return (
        <div className="flex items-center">
            <div>
                <BsDot className="w-7 h-7 text-[#4C10FB]" />
            </div>
            <span className="px-2">{nameOfNeeded}</span>
        </div>
    )
}

export default CourseFirstItem