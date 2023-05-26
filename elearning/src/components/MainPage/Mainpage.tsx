import LeftSide from "../Leftside/Leftside";
import SearchComp from "../Search/SearchComp";
import { Outlet } from 'react-router-dom'

const MainPage = () => {
    return (
        <div className=" flex bg-[#0E111E]  ">
            <div className="md:inline-block w-[6rem] md:w-[20rem] h-screen">
                <aside className="fixed top-0   bg-[#0E111E]">
                    <LeftSide />
                </aside>
            </div>
            <div className="flex-[5] h-screen py-10 px-2 overflow-hidden overflow-y-scroll">
                <div className="hidden h-[10%] md:inline">
                    <SearchComp />
                </div>
                <div className="bg-white  md:h-[85%] rounded-2xl py-5 px-7 ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainPage