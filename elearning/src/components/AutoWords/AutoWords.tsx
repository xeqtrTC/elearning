import { FC, useEffect, useState } from "react";

const words = [
    "Get Hired.",
    "Get Promoted.",
    "Be your own boss.",
    "Reach your career goals."
]

const AutoWords: FC = () => {
    const [indexWord, setIndexWord] = useState<number>(0);

    const changeWord = () => {
        if (indexWord === words.length - 1) {
            return setIndexWord(0);
        }
        const updateData = indexWord + 1;
        setIndexWord(updateData);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            changeWord()
        }, 2000)
        return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indexWord])
    return (
        <span className="text-4xl md:text-7xl font-bold text-[#F7CAB7]">{words[indexWord]}</span>

    )
} 

export default AutoWords