import { Dispatch, SetStateAction, useState } from "react";
import { quizzAnswerProps } from "../../Hooks/interfaces"
import { motion, AnimatePresence } from 'framer-motion'
const DataQuizz = ({ quizzAnswers, quizz_name, moveForwardWithQuizz, doneQuestions, setDoneQuestions}: 
    { quizzAnswers: quizzAnswerProps[], 
        quizz_name: string, 
        moveForwardWithQuizz: () => void, 
        setDoneQuestions: Dispatch<SetStateAction<{answerId:number, questionId: number, isCorrect: boolean}[]>>,
        doneQuestions: { isCorrect: boolean, answerId: number, questionId: number }[]
    }) => {

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    
    const moveForward = () => {
        if (selectedAnswer) {
            moveForwardWithQuizz();
            setSelectedAnswer(null);
        }
    }
    console.log(selectedAnswer);
    const onclick = ({ 
        quizz_answer_id, 
        quizz_isAnswerCorrect, 
        quizz_question_id
    }: {quizz_answer_id: number,
         quizz_isAnswerCorrect: boolean,
         quizz_question_id: number
        }) => {
        const dataToBeAdded = {
            isCorrect: quizz_isAnswerCorrect,
            answerId: quizz_answer_id,
            questionId: quizz_question_id

        }
        const findProperId = doneQuestions.find((item) => item.questionId === quizz_question_id);
        setSelectedAnswer(quizz_answer_id)
        console.log(findProperId);
        if (findProperId) {
            const tobeaddednew = doneQuestions.map((item) => 
                item.questionId === quizz_question_id ? {...item, isCorrect: quizz_isAnswerCorrect, answerId: quizz_answer_id, questionId: quizz_question_id } : item
            )
            setDoneQuestions(tobeaddednew);
            return
        }
        // console.log(newDoneQuestionsValue)
        setDoneQuestions((prevValue) => [...prevValue, dataToBeAdded])
    }
    return (
        <div className="">
            <div className="flex flex-col space-y-5">
                <div className="whitespace-normal break-words text-center">
                    <p className="font-medium text-xl">{quizz_name}</p>
                </div>
                <div  
                className="grid grid-cols-2 gap-5  ">
                          <AnimatePresence>
                    {
                        quizzAnswers?.map((item, index) => {
                            const { quizz_answer_id, quizz_answer_text, quizz_isAnswerCorrect, quizz_question_id } = item;
                            return (
                                <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.2 }}
                                className="flex justify-center  " 
                                key={quizz_answer_id} 
                                onClick={() => onclick({ quizz_answer_id, quizz_isAnswerCorrect, quizz_question_id})}>
                                    <button className={` 
                                    ] hover:bg-black/20 ${quizz_answer_id === selectedAnswer ? 
                                    'bg-black/20' : 'bg-black' } text-white  hover:text-black border
                                     border-black py-2 break-all rounded-md transitionOverlay w-[20rem]
                                     font-medium px-5
                                     `}>
                                        {quizz_answer_text}
                                    </button>
                                </motion.div>
                            )
                        })
                    }
                   </AnimatePresence>
                </div>
                <div className="flex justify-center " onClick={moveForward}>
                    <button className={`hover:bg-black/20 mt-5 bg-black text-white  hover:text-black border border-black py-2 px-20 rounded-md transitionOverlay`}>Next</button>
                </div>
                
            </div>
        </div>
    )
}

export default DataQuizz
