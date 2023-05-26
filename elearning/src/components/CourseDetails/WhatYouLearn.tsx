import { FC } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { propsTest, whatyoulearnProps } from "../Hooks/interfaces";


const WhatYouLearn = ({whatyoulearns}: propsTest) => {
    return ( 
        <div className="bg-[#f6f6fb] p-5 rounded-2xl">
            <div className="text-center">
                <span className="text-[#4c0ffb] font-bold text-xl">WHAT YOU'LL LEARN</span>
            </div>
            
            <div className="py-5">
                <ul className="grid grid-cols-2 text-[#373f49] text-sm font-medium gap-4"> 
                {
                    whatyoulearns?.map((item: whatyoulearnProps) => {
                        const { whatyoulearn_id, title } = item;
                        return (
                            <li className="flex" key={whatyoulearn_id}><AiOutlineCheck className="w-20 h-10 mr-3 text-[#4c0ffb] " />{title}</li>
                        )
                    })
                }
                    
                </ul>
            </div>
        </div>
    )
}

export default WhatYouLearn