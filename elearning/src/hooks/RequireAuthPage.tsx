import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import DoesntExistPage from "../components/DoesntExist/DoesntExistPage";
import { RequirePageProps, rolesProps } from "../components/Hooks/interfaces";
import Loading from "../components/Loading/Loading";
import UseAuthContext from "./authUseContext";
import UseAuthHook from "./useAuthHook"


export const RequireAuthPage = ({ allowedRoles }: any) => {
    const { roles, username, loading } = UseAuthHook();
    const location = useLocation();
    const prevLocation = location.state?.from || -1; 

    let content
    if (loading) {
        content = (
            <Loading />
        ) 
    } else {
        content = (
            roles?.some((role: rolesProps) => allowedRoles.includes(role?.name)) ? <Outlet /> : <DoesntExistPage /> 
        )
    }

    return (
        <>
        {content}
        </>
    )
}

export const RequireForMyCoursePage = () => {
    const { username, loading, failed } = UseAuthHook();
    const location = useLocation();
    const prevLocation = location.state?.from || -1; 
    let content;

    if (loading) {
        content = (
            <Loading />
        )
    } else if (failed) {
        content = <Navigate to={prevLocation} replace={true} />
    } else {
        content = <Outlet />
    }
        
    return (
        <>
        {content}
        </>
    );
}

export const RequireForLogin = () => {
    const { username, loading } = UseAuthHook();
    const location = useLocation();
    const prevLocation = location.state?.from || -1;
    let content;

    if (loading) {
        content = (
            <Loading />
        )
    } else {
        content = (
            username ? <Navigate to={prevLocation} replace={true} /> : <Outlet /> 
        )
    } 

    return (
        <>
        {content}
        </>
    )
}
