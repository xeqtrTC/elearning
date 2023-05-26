import { createContext, ReactElement, useState } from "react";
import { AuthStatsProps, whoAmIProps } from "../components/Hooks/interfaces";
import { whoAmIQuery } from "./query";




const AuthELearningContext = () => {
    const [authStats, setAuthStats] = useState<whoAmIProps>({
        id: 0,
        username: '',
        email: '',
        roles: [],
        loading: false
    });

    // const { data, isLoading, isSuccess } = whoAmIQuery()
    // console.log(data);
    // // if(isSuccess) {
    // //     const { username, email, roles, id } = data!;
    // //         setAuthStats({
    // //             id: id,
    // //             username: username,
    // //             email: email,
    // //             roles: roles
    // //         })
    // // }

    
    
    return { authStats, setAuthStats };
}

export type UseAuthContextType = ReturnType<typeof AuthELearningContext>

const initState: UseAuthContextType = {
    authStats: {
        id: 0,
        username: '',
        email: '',
        roles: [],
        loading: false
    },
    setAuthStats: () => {}
}
const ContextStateAPI = createContext<UseAuthContextType>(initState);
type ChildrenType = { children?: ReactElement | ReactElement[] };

export const AuthContextStateProvider = ({ children }: ChildrenType ): ReactElement  => {
    return (
        <ContextStateAPI.Provider value={AuthELearningContext()}>
            {children}
        </ContextStateAPI.Provider>
    )
}

export default ContextStateAPI