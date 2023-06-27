import { FC } from "react";
import { LinksToImage  } from "../Hooks/imageLinks";
import { whatyoubuildProps } from "../Hooks/interfaces";
const WhatYouBuild = ({data}: {data:whatyoubuildProps[]}) => {
    return (
        <div>
            {data?.map((item) => {
                const { wub_description, wub_id, wub_imageLink, wub_title,} = item;
                return (
                    <div className="" key={wub_id}>
                        <div className="w-[26rem] ">
                            <img src={`http://localhost:5000/image/${wub_imageLink}`} className='rounded-lg min-h-[15rem] object-cover' />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <span className="text-2xl font-bold">{wub_title}</span>

                            <span className="text-lg">{wub_description}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default WhatYouBuild