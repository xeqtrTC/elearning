import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { addAnswerToQuestion } from "../../../hooks/api";
import { addAnswerToQuestionMutation } from "../../../hooks/mutate";
import { getListOfQuestions } from "../../../hooks/query"

const ListQuestion = () => {
    const { data } = getListOfQuestions();
    const [answerOnQuestion, setAnswerOnQuestion] = useState<string>('');
    const [freqQuestionId, setFreqQuestionId] = useState<string>('');

    const { mutate: addATQMutation } = addAnswerToQuestionMutation({ setAnswerOnQuestion })

    const addAnswerToQuestionFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            answerOnQuestion: answerOnQuestion,
            freqQuestionId: freqQuestionId
        }
        if ( answerOnQuestion && freqQuestionId ) {
            addATQMutation(data);
        }
    }

    return (
        <form onSubmit={addAnswerToQuestionFunction}>
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                    <div className="flex flex-col space-y-2" >
                        <label htmlFor="wuwtl" className="font-medium">List of questions</label>
                        <select className="text-black py-2 w-full rounded-xl outline-none cursor-pointer" onChange={(e) => setFreqQuestionId(e.target.value)}>
                            <option></option>
                            {
                                data?.map((item) => {
                                    const { id, nameOfQuestion } = item;
                                    return (
                                        <option key={id} value={id}>{nameOfQuestion}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="wuwtl" className="font-medium">Add answer to question </label>
                        <input 
                        name='answerOnQuestion'
                        type='text' 
                        value={answerOnQuestion} 
                        onChange={(e) => setAnswerOnQuestion(e.currentTarget.value)}
                        placeholder='Add answer to question...'
                        className="inputCourseDetails" />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-white text-black rounded-lg py-2 px-5">Add</button>
                    </div>
            </div>
        </form>
    )
}

export default ListQuestion