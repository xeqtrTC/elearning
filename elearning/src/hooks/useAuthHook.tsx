import Loading from "../components/Loading/Loading";
import UseAuthContext from "./authUseContext";
import { whoAmIQuery } from "./query"


const UseAuthHook = () => {
    const { data, isSuccess, isLoading } = whoAmIQuery();
    const { setAuthStats } = UseAuthContext();
    if (isLoading) {
        return {
            roles: [],
            username: '',
            email: '',
            loading: true
        }
    }

    if (isSuccess) {
        const { roles, username, email, id } = data!;

        if (username === undefined) {
            return {
                roles: [],
                username: '',
                email: '',
                loading: false,
                failed: true
            }
        }

       console.log(roles);
    //    setAuthStats({
    //     id: id,
    //     username: username,
    //     email: email,
    //     roles: roles
    //    })

       
        return {    
            roles,
            username,
            email,
            loading: false
        }
    }

    return {roles: [], username: '', email: ''}

}

export default UseAuthHook