import { useState } from "react"
import { BsDot } from "react-icons/bs"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { courseFreqQuestionProps, frequentlyAskedQuestionsProps } from "../Hooks/interfaces"

const CourseFreqQuestion = ({ frequentlyAskedQuestions }: courseFreqQuestionProps) => {
    const [showAnswer, setShowAnswer] = useState<number | null>(null)
    return (
        <div className="bg-[#f6f6fb] py-20 font-Barlow">
            <div className="w-[70%] m-auto">
                <div className="text-center w-[60%] m-auto flex flex-col space-y-4">
                    <span className="text-4xl font-bold">Frequently asked questions</span>
                </div>
                <div className="space-y-5 py-10">
                    {
                        frequentlyAskedQuestions?.map((item) => {
                            const { id, courseCourseId, freqQuestion, nameOfQuestion } = item;
                            return (
                                <div 
                                className="bg-white py-5 px-7 rounded-2xl group cursor-pointer" 
                                onClick={() => setShowAnswer(id === showAnswer ? null : id)} 
                                key={id}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-bold text-2xl">{nameOfQuestion}</span>
                                        </div>
                                        <div>
                                            <div 
                                            className="
                                            border 
                                            border-[#4c0ffb]
                                            text-[#4c0ffb] 
                                            p-2 
                                            rounded-full 
                                            cursor-pointer 
                                            transitionOverlay
                                            group-hover:bg-[#4c0ffb]
                                            group-hover:text-white">
                                                { id === showAnswer ? <SlArrowUp className="w-5 h-5 " /> : <SlArrowDown className="w-5 h-5 " /> }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-1">        
                                        {
                                            id === showAnswer && (
                                                freqQuestion?.map((item) => {
                                                    const { id: answerId, answerOnQuestion, freqQuestionId } = item;
                                                    return (
                                                        id === freqQuestionId && (
                                                            <div key={answerId} className='flex space-x-3 items-center break-all'>
                                                                <div>
                                                                    <BsDot className="text-[#4c0ffb] w-10 h-10" />
                                                                </div>
                                                                <span className="text-lg font-medium">{answerOnQuestion}</span>
                                                            </div>
                                                        )
                                                        )
                                                    })
                                                )
                                            }

                                            </div>
                                </div>
                            )
                        })
                    }
                </div>
                    
            </div>
        </div>
    )
}

export default CourseFreqQuestion