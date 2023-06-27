import { MdOutlineOndemandVideo } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import LeftSideUI from "../../UI/LeftSideUI";

const WatchLecturesLeftSideLessonD = ({ title, lessonDetail_fakeID }: { title: string, lessonDetail_fakeID: number}) => {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const navigateToProperLesson = (lessonDetail_fakeID: number) => {
        navigate(`${lessonDetail_fakeID}`)
    }
    return (
        <LeftSideUI ID={id!} nameOfLecture={title} fakeId={lessonDetail_fakeID} />
    )
}

export default WatchLecturesLeftSideLessonD