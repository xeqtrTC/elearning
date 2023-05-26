import { Link } from "react-router-dom"
import AuthHookUsers from "../../hooks/authHooksUser";
import UseAuthHook from "../../hooks/useAuthHook"
import { headerLinksProps } from "../Hooks/interfaces"
import { GoThreeBars } from 'react-icons/go'
import { useState } from "react";
import HeaderAdminLinks from "./HeaderBarLinks";
import HeaderBarLinks from "./HeaderBarLinks";
const HeaderLinks = ({row}: headerLinksProps) => {
    const [adminLink, setAdminLink] = useState<boolean>(false);
    
    const { username } = UseAuthHook();
    const doesUserBelongs = AuthHookUsers({neededRoles: ['Admin'] });
    console.log(doesUserBelongs);
    const setAdminOpen = () => setAdminLink(prevValue => !prevValue);

    return (
        <div className={`text-center  flex ${row ? 'flex-row' : 'flex-col space-y-3'}  items-center sm:space-x-2 space-x-5  cursor-pointer `}>
            {
                username && (
                    <div >
                        <Link to='/mycourses'>
                            <span className="border-b-[#0E111E] hover:border-b p-2 font-bold">My courses</span>
                        </Link>
                    </div>
                )
            }
            <div >
                <Link to='/courses'>
                    <span className="border-b-[#0E111E] hover:border-b p-2 font-bold">Courses</span>
                </Link>
            </div>
            <div>
                <span className="border-b-[#0E111E] hover:border-b p-2  font-bold">Career Paths</span>
            </div>
            <div>
                <span className="border-b-[#0E111E] hover:border-b p-2  font-bold">Career Paths</span>
            </div>
            <div>
                <span className="border-b-[#0E111E] hover:border-b p-2  font-bold">Workshop & More</span>
            </div>
            {
                !username ? (
                <div className={`flex ${row ? 'flex-row space-x-3' : 'flex-col space-y-3'}`}>
                    <button className="bg-[#0E111E] py-2 px-4 text-white rounded-3xl  font-md">JOIN ACADEMY</button>
                    <button className="headerSignInButton border px-2 rounded-[20px] border-black">
                        <Link to='/signup'>
                        SIGN IN
                        </Link>
                    </button>
                </div>
                ) : (
                    <div>
                        {
                            !row ? (
                                <HeaderBarLinks isAllowed={doesUserBelongs.isAllowed} />
                            ) : (
                                <>
                                <GoThreeBars className="w-7 h-7 cursor-pointer" onClick={setAdminOpen}/>
                                {
                                    adminLink && (
                                        <div className="absolute shadow-lg rounded-md text-black font-medium">
                                            <HeaderBarLinks isAllowed={doesUserBelongs.isAllowed} />
                                        </div>
                                    )
                                }
                                </>
                            )
                        }
                        
                    </div>
                )
            }
        </div>
    )
}

export default HeaderLinks