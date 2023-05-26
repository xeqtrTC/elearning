import YoutubeVideo from "./YoutubeVideo"
import { AiOutlineClose } from 'react-icons/ai'
import UseContextState from "../../hooks/UseELearningContext"
import { FormEvent, useRef } from "react";

const YoutubePreview = () => {

    const { setShowYoutubeVideo, showYoutubeVideo } = UseContextState();
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickOutsideOfDiv = (e: FormEvent<HTMLDivElement>) => {
        if (inputRef.current && showYoutubeVideo && !inputRef.current.contains(e.target as Node)) {
            setShowYoutubeVideo(false);
        }
    }


    const setShowYoutubeFunction = () => setShowYoutubeVideo(false);

    return (
        <div className="bg-black/30 fixed w-full h-screen z-[60] flex items-center justify-center" onClick={onClickOutsideOfDiv}>
            <div className="bg-black py-5 px-9  rounded-md w-[80%] h-[60%] m-auto" ref={inputRef}>
                <div className="px-2 flex  h-full">
                    <div className=" w-full ">
                        <YoutubeVideo />
                    </div>
                    <AiOutlineClose className="text-white w-6 h-6 cursor-pointer hover:scale-110 " onClick={setShowYoutubeFunction}/>
                </div>
            </div>
        </div>
    )
}

export default YoutubePreview