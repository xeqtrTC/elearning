import { Link, useNavigate } from "react-router-dom"
import { RiDashboardLine } from 'react-icons/ri'
import { doesUserBelongsProps } from "../Hooks/interfaces"
import { BiLogOut } from 'react-icons/bi'
import { useMutation } from "react-query"
import { logoutUser } from "../../hooks/api"
import { FormEvent } from "react"
import { logoutMutation } from "../../hooks/mutate"
const HeaderBarLinks = ({ isAllowed }: doesUserBelongsProps) => {
    const navigate = useNavigate();

    const { mutate: logOut } = logoutMutation();

    const logoutFunction = (e: FormEvent<HTMLLIElement>) => {
        e.preventDefault();
        try {
            logOut();
        } catch (error) {   
            console.log(error);
        }
    }

    return (
        <ul className="text-center">
            {
                isAllowed && (
                    <li className="hoverAdminLink rounded-t-md flex"><Link to='homepage' className="flex items-center"><RiDashboardLine className="w-5 h-5 mr-2" /> Homepage dash</Link></li>
                )
            }
            <li className="hoverAdminLink p-2 flex items-center justify-center text-center" onClick={logoutFunction}><BiLogOut className="w-5 h-5 mr-2" />Logout</li>
        </ul>
    )
}

export default HeaderBarLinks