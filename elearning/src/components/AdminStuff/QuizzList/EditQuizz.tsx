import { useParams } from "react-router-dom"
import { findOneQuizzQuery } from "../../../hooks/query";
import { FormEvent, useState } from "react";
import { editQuizzAnswer, editQuizzQuestion } from "../../Hooks/interfaces";
import { updateQuizzAnswerMutation, updateQuizzQuestionMutation } from "../../../hooks/mutate";

const EditQuizz = () => {
    const { id } = useParams();
    const [dataToBeSetAnswer, setDataToBeSetAnswer] = useState<editQuizzAnswer>({
        selectedAnswer: null,
        editValue: '',
        isAnswerCorrect: false
    })
    const [dataToBeSetQuestion, setDataToBeSetQuestion] = useState<editQuizzQuestion>({
        selectedAnswer: null,
        editValue: ''
    })

    const { mutate: editAnswerMutation } = updateQuizzAnswerMutation({setDataToBeSetAnswer});
    const { mutate: editQuestionMutation } = updateQuizzQuestionMutation({setDataToBeSetQuestion});
    const { data, isLoading, isSuccess } = findOneQuizzQuery(id!)
    
    // asnwer edit
    const changeValueOfEditValueAnswer = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setDataToBeSetAnswer((prevValue) => ({...prevValue, editValue: value}))
    }
   
    const changeDataToBeSetAnswer = (quizz_answer_id: number, quizz_answer_text: string, quizz_isAnswerCorrect: boolean) => {
        setDataToBeSetAnswer((prevValue) => ({...prevValue, editValue: quizz_answer_text, selectedAnswer: quizz_answer_id, isAnswerCorrect: quizz_isAnswerCorrect }))
    }
    const onClickSetAnswer = () => {
        setDataToBeSetAnswer((prevValue) => ({...prevValue, isAnswerCorrect: !prevValue.isAnswerCorrect}))
    }
    const editAnswerFn = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            editAnswerMutation(dataToBeSetAnswer)
        } catch (error: any) {
            console.log(error)
        }
    }

    // question edit
    const changeValueOfEditValueAnswerQuestin = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setDataToBeSetQuestion((prevValue) => ({...prevValue, editValue: value}))
    }
    const changeDataToBeSetQuestion = (quizzQuestion_id: number, quizz_text: string) => {
        setDataToBeSetQuestion((prevValue) => ({...prevValue, selectedAnswer: quizzQuestion_id, editValue: quizz_text}))
    }

    const editQuestionFn = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            editQuestionMutation(dataToBeSetQuestion);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(data);
    return (
        <div className="flex flex-col space-y-3">
            {
                data?.quizzQues?.map((quizzItems) => { 
                    const { quizzQuestion_id, quizz_text } = quizzItems
                    return (
                        <div className="flex flex-col space-y-3" key={quizzItems.quizzQuestion_id}>
                            <div className="flex justify-between">
                                <input type='text' className="inputEditUser w-full" 
                                value={dataToBeSetQuestion.selectedAnswer === quizzQuestion_id ? dataToBeSetQuestion.editValue : quizz_text}
                                onChange={changeValueOfEditValueAnswerQuestin} 
                                readOnly={dataToBeSetQuestion.selectedAnswer !== quizzQuestion_id}
                                onClick={() => changeDataToBeSetQuestion(quizzQuestion_id, quizz_text)}
                                />
                                {
                                    dataToBeSetQuestion.selectedAnswer === quizzQuestion_id && (
                                        <div className="px-5 w-[20rem]">
                                            <button className="inputEditUserButton" onClick={editQuestionFn}>Change value of question</button>
                                        </div>
                                    )
                                }
                            </div>
                        {
                            quizzItems.quizzAnswers?.map((answerItems) => {
                                const {  quizz_answer_id, quizz_answer_text, quizz_isAnswerCorrect} = answerItems
                                if (quizzItems.quizzQuestion_id === answerItems.quizz_question_id) {
                                    return (
                                        <div className="flex flex-col space-y-3" key={quizz_answer_id}>
                                            <div className="flex justify-between">
                                                <input type='text' 
                                                onChange={changeValueOfEditValueAnswer} 
                                                readOnly={dataToBeSetAnswer.selectedAnswer === quizz_answer_id ? false : true } 
                                                onClick={() => changeDataToBeSetAnswer(
                                                    quizz_answer_id, quizz_answer_text, quizz_isAnswerCorrect
                                                    )} 
                                                value={dataToBeSetAnswer.selectedAnswer === quizz_answer_id ? dataToBeSetAnswer?.editValue : quizz_answer_text} 
                                                className="inputEditUser ml-5 space-y-2 w-[100%]" 
                                                />
                                                {
                                                    dataToBeSetAnswer.selectedAnswer === quizz_answer_id && (
                                                        <div className="px-5 w-[12rem]">
                                                            <button className="inputEditUserButton" onClick={onClickSetAnswer}>
                                                                {dataToBeSetAnswer.isAnswerCorrect === true ? 'Answer is true' : 'Answer is false'}
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {
                                                dataToBeSetAnswer.selectedAnswer === quizz_answer_id && (
                                                    <div className="flex justify-end">
                                                        <button className="inputEditUserButton" onClick={editAnswerFn}>Change</button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    )

                    
                })
            }
        </div> 
    )
}

export default EditQuizz