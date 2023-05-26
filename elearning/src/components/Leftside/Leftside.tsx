import { FC, useEffect, useState } from "react";
import { RxDashboard } from 'react-icons/rx'
import { SlGraduation } from 'react-icons/sl'
import { TbLogout } from 'react-icons/tb'
import { FiMessageCircle } from 'react-icons/fi'
import { BiCalendar } from 'react-icons/bi'
import { TfiHelpAlt } from 'react-icons/tfi'
import { DiGoogleAnalytics } from 'react-icons/di'
import { AiOutlineFileAdd, AiOutlineMail } from 'react-icons/ai'
import { HiOutlineViewGridAdd, HiOutlineUsers } from 'react-icons/hi'
import { GoSettings } from 'react-icons/go'
import { Link, NavLink, useLocation } from "react-router-dom";
import { socket } from "../LiveMessages/LiveMessages";
interface NavLinkProps {
    to: string;
    activeClassName?: string;
    className?: string;
    exact?: boolean;
    strict?: boolean;
    isActive?: (match: any, location: any) => boolean;
  }
  
// TO DO COMPONENT
const LeftSide: FC = () => {
    const [lengthOfChats, setLengthOfMatches] = useState<number | null>(null)
    const [homepage, setHomepage] = useState<boolean>(false);
    const [courses, setCourses] = useState<boolean>(false)
    const [addRole, setAddRole] = useState<boolean>(false);
    const [listUsers, setListUsers] = useState<boolean>(false);
    const [addCourse, setAddCourse] = useState<boolean>(false);
    const [addinstructor, setAddInstructor] = useState<boolean>(false);
    const [addcategory, setAddCategory] = useState<boolean>(false);
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const location = useLocation();
    const locatioName = location.pathname;

    useEffect(() => {
        socket.on('list_of_rooms', (data) => {
            console.log('data,aa', data)
            setLengthOfMatches(data);
        });
    }, [])
    useEffect(() => {
        socket.emit('admin_connected');
      }, []);
      const active = 'bg-red-600 text-white'
    return (
        <div className=" py-5 px-5 text-white ">
            <div className="text-center">
                {/* <span className="text-3xl">TC ACADEMY</span> */}
            </div>
            <div className="py-16 space-y-4">
            <NavLink
                to="/homepage"
                className={({ isActive }) =>( isActive ? `${active}` : ``)}>
                    <div className={`flex items-center p-4 rounded-xl ${homepage ? 'bg-white text-black' : 'text-white'}`}>
                       <div>
                            <RxDashboard className="w-6 h-6" />
                       </div>
                       <div className="hidden lg:inline-block">
                            <span className="px-5 font-medium text-sm hidden md:inline">Dashboard</span>
                       </div>
                </div>
            </NavLink>
            <NavLink to='/homepage/courses' 
                className={({ isActive }) =>( isActive ? `${setCourses(true)}` : `${setCourses(false)}`)}>
                    <div className={`flex items-center p-4 rounded-xl ${courses ? 'bg-white text-black' : 'text-white '}`}>
                        <div>
                            <SlGraduation className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">Courses</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink to='/homepage/addrole'
                className={({ isActive }) =>( isActive ? `${setAddRole(true)}` : `${setAddRole(false)}`)}>
                    <div className={`flex items-center p-4 rounded-xl ${addRole ? 'bg-white text-black' : 'text-white'}`}>
                        <div className="">
                            <HiOutlineViewGridAdd className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">Add Role</span>
                        </div>
                    </div>         
                </NavLink>
                <Link to='/homepage/guestchat'>
                    <div className={`flex items-center p-4 rounded-xl`}>
                        <div>
                            <FiMessageCircle className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">Messages</span>
                        </div>
                        {
                            lengthOfChats! > 0 ? (
                                <div className=" w-6 h-6 flex justify-center items-center bg-[#F9C253] top-0 right-0 rounded-full">
                                    <span className=" font-bold text-black">
                                        {
                                            lengthOfChats! > 0 ? (
                                                lengthOfChats
                                            ) : null
                                        }
                                    </span>
                                </div>
                            ) : null
                        }
                            
                    </div>         
                </Link>
                <NavLink to='/homepage/addcourse'
                className={({ isActive }) =>( isActive ? `${setAddCourse(true)}` : `${setAddCourse(false)}`)}>
                    <div className={`flex items-center p-4 rounded-xl  ${addCourse ? 'bg-white text-black' : 'text-white'}`}>
                        <div className="">
                            <AiOutlineFileAdd className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">Add course</span>
                        </div>
                    </div>         
                </NavLink>
                <NavLink to='/homepage/userslist'
                className={({ isActive }) =>( isActive ? `${setListUsers(true)}` : `${setListUsers(false)}`)}>
                    <div className={`items-center p-4 rounded-xl ${listUsers ? 'bg-white text-black' : 'text-white' }`}>
                        <div>
                            <HiOutlineUsers className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">List users</span>
                        </div>
                    </div>         
                </NavLink>
                <NavLink to='/homepage/addinstructor'
                className={({ isActive }) =>( isActive ? `${setAddInstructor(true)}` : `${setAddInstructor(false)}`)}>
                    <div className={`flex items-center p-4 rounded-xl ${addinstructor ? 'bg-white text-black' : 'text-white' }`}>
                        <div>
                            <HiOutlineUsers className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">Add instructor</span>
                        </div>
                    </div>         
                </NavLink>
                <NavLink to='/homepage/addcategory'
                className={({ isActive }) =>( isActive ? `${setAddCategory(true)}` : `${setAddCategory(false)}`)}>
                    <div className={`flex items-center p-4 rounded-xl ${addcategory ? 'bg-white text-black' : 'text-white' }`}>
                        <div>
                            <HiOutlineUsers className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">Add category</span>
                        </div>
                    </div>         
                </NavLink>
                <NavLink to='/homepage/sendemail'
                className={({ isActive }) =>( isActive ? `${setSendEmail(true)}` : `${setSendEmail(false)}`)}>
                    <div className={`flex items-center p-4 rounded-xl ${sendEmail ? 'bg-white text-black' : 'text-white' }`}>
                        <div>
                            <AiOutlineMail className="w-6 h-6" />
                        </div>
                        <div className="hidden md:inline">
                            <span className="px-5 font-medium text-sm hidden md:inline">Send emails</span>
                        </div>
                    </div>         
                </NavLink>
                {/*   */}
            </div>
        </div>
    )
}

export default LeftSide