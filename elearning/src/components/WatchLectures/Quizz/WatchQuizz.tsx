import { ImSpinner10 } from "react-icons/im"
import LoadingQuizz from "./LoadingQuizz"
import DataQuizz from "./DataQuizz"
import { quizzProps } from "../../Hooks/interfaces"
import { useState } from "react"
import { motion } from "framer-motion"

const WatchQuizz = ({quizz}: {quizz:quizzProps}) => {
    const [indexOfQuizz, setIndexOfQuizz] = useState<number>(0)
    const [doneQuestions, setDoneQuestions] = useState<{
        isCorrect: boolean, answerId: number, questionId: number
    }[]>([]);
    const [isQuizzOver, setIsQuizzOver] = useState<boolean>(false);
    const [howManyAnswersCorrect, setHowManyAnswersCorrect] = useState<number | null>(null);
    let currentIndex = 0;
    const moveForwardWithQuizz = () => {
        const nextIndex = indexOfQuizz + 1;
        console.log(nextIndex);
        if (nextIndex === quizz?.quizzQues?.length!) {
            // console.log('zavrsen')
            const countedCorrectItems = doneQuestions.filter((item) => item.isCorrect === true);
            setHowManyAnswersCorrect(countedCorrectItems.length);
            setIsQuizzOver(true);
        }
        if (nextIndex < quizz.quizzQues?.length!) {
            setIndexOfQuizz(nextIndex);
        }
    }
    console.log(doneQuestions);
    return (
        <div className='bg-[#FFFAED] h-full'>
            <div className="flex justify-center items-center h-full border ">
                <div className="flex flex-col w-[80%] border h-full">
                    <div className="text-center py-1">
                        <span className="font-bold text-xl">{indexOfQuizz + 1} out of {quizz.quizzQues?.length!}</span>
                    </div>
                    <div className=" w-full overflow-hidden m-auto flex items-center justify-center border  h-full">
                            {/* <DataQuizz /> */}
                            {
                                isQuizzOver ? (
                                    <div>
                                        <span>You guessed {howManyAnswersCorrect} correct out of {quizz.quizzQues?.length!}</span>
                                    </div>
                                ) : (
                                    quizz.quizzQues![indexOfQuizz] ? (
                                        <DataQuizz doneQuestions={doneQuestions} setDoneQuestions={setDoneQuestions} moveForwardWithQuizz={moveForwardWithQuizz} quizzAnswers={quizz.quizzQues![indexOfQuizz].quizzAnswers} quizz_name={quizz.quizzQues![indexOfQuizz].quizz_text}  />
                                    ) : null
                                )
                            }               
                    </div>
                </div>
            </div>
            {/* <div>
                <img src='https://i.ibb.co/ZzfP2qY/deathstroke-dc-comics-4k-wallpaper-uhdpaper-com-69-0-h.jpg' className="w-full h-full object-fit" />
            </div> */}
        </div>
    )
}

export default WatchQuizz