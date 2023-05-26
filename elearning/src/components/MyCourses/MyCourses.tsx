import axios, { AxiosError, isAxiosError } from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { getCouresForUser } from "../../hooks/query"
import CourseTab from "../CourseTab/CourseTab";
import CourseListHolder from "../ForReUse/CourseListHolder";
import Loading from "../Loading/Loading";

const MyCourses = () => {

    const { data, isLoading, isSuccess, error, isError } = getCouresForUser();
    
    let content;
    console.log(data, isLoading, isSuccess);
    if(isLoading) {
        content = (
            <Loading />
        )
    }

    if (error) {
        const axiosError = isAxiosError(error);
        if (axiosError) {
            error?.response?.status === 404 ? (
                content = (
                    <Navigate to='/' replace={true} />
                    )
                ) : (
                    <Outlet />
                )
        }
    }

    if (isSuccess )  {
        content = (
            <div className="responsiveNormal">
                <CourseListHolder data={data} />
            </div>
           
        )
    }


    return (
        <>
        {content}
        </>
    )
}

export default MyCourses