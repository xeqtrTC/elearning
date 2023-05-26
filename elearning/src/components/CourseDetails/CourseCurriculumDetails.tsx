import { FC } from "react";
import { BsDot } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

const CourseCurriculumDetails:FC = () => {
    return (
        <div className="py-10  font-Barlow border-b bg-white border-[#f6f6fb]  px-10 rounded-2xl ">
            <div className="flex justify-between pb-5" >
                <div className="flex flex-col space-y-5">
                    <span className="font-bold text-2xl">Introduction</span>
                    <span className="text-[#373f49] text-xl">5 lectures</span>
                </div>
            <div>
                <div className=" border border-[#4c0ffb] p-2 rounded-full cursor-pointer">
                    <SlArrowUp className="w-6 h-6 text-[#4c0ffb]" />
                </div>
            </div>
            </div>
            <div className="flex justify-between border-t py-5">
                <div className="flex items-center space-">
                    <div>
                        <MdOutlineOndemandVideo className="text-[#4c0ffb] w-6 h-6" />
                    </div>
                    <div className="flex space-3 items-center px-3 text-xl">
                        <span className="font-bold ">The Complete Web Developer: Zero to mastery </span>
                        <BsDot className="w-7 h-7" />
                        <span>5:04</span>
                    </div>   
                </div>
                <div>
                    <button className="border-[#4c0ffb] text-[#4c0ffb] border px-6 py-1.5 rounded-lg hover:bg-[#4c0ffb] hover:text-white transitionOverlay">PREVIEW</button>
                </div>
            </div>
        </div>
    )
}

export default CourseCurriculumDetails