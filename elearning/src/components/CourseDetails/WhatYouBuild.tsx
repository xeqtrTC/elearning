import { FC } from "react";
import { LinksToImage  } from "../Hooks/imageLinks";
import { whatyoubuildProps } from "../Hooks/interfaces";
const WhatYouBuild = ({ courseCourseId, createdAt, updatedAt, wub_description, wub_id, wub_imageLink, wub_title}: whatyoubuildProps) => {
    return (
        <div className="">
            <div className="w-[26rem] ">
                <img src={`http://localhost:5000/image/${wub_imageLink}`} className='rounded-lg min-h-[15rem] object-cover' />
            </div>
            <div className="flex flex-col space-y-3">
                <span className="text-2xl font-bold">{wub_title}</span>

                <span className="text-lg">{wub_description}</span>
            </div>
        </div>
    )
}

export default WhatYouBuild