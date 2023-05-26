import { LinksToImage } from "../Hooks/imageLinks"
import { AllCourseDetailsArray, courseArray } from "../Hooks/interfaces"

const CoursesSearch = (item: AllCourseDetailsArray) => {
    const { title } = item;
    return (
        <div className="py-2 text-black flex items-center">
            <div>
                <img src={LinksToImage.webDeveloperLink} className='w-10 h-10 object-cover rounded-xl' />
            </div>
            <div className="px-3 font-medium">
                <span>{title}</span>
            </div>
        </div>
    )
}

export default CoursesSearch