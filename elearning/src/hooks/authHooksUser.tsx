import { useEffect, useState } from "react";
import { rolesProps } from "../components/Hooks/interfaces";
import UseAuthHook from "./useAuthHook"


const AuthHookUsers = ({ neededRoles}: any) => {
    const { roles } = UseAuthHook();

    let isAllowed: boolean = false;
    if (roles) {
        roles?.some((role: rolesProps) => {
            if (neededRoles.includes(role.name)) {
                isAllowed = true;
                return;
            }
            isAllowed = false;
            return
        })
    }

    return {
        isAllowed
    }

}

export default AuthHookUsers