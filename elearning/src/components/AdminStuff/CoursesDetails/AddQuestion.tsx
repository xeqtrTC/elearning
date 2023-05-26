import { FormEvent, useState } from "react"
import { useMutation } from "react-query";
import { addQuestionToCourse } from "../../../hooks/api";
import { addQuestionMutation } from "../../../hooks/mutate";
import { addLectureProps, addLecturePropsTest } from "../../Hooks/interfaces";

const AddQuestion = ({ course_id }: addLecturePropsTest) => {
    const [nameOfQuestion, setNameOfQuestion] = useState<string>('');
    const [answerOnQuestion, setAnswerOnQuestion] = useState<string>('');
    
    const { mutate: questionMutate } = addQuestionMutation({ setNameOfQuestion, setAnswerOnQuestion })
    const addQuestionFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            nameOfQuestion: nameOfQuestion,
            courseId: course_id,
            answerOnQuestion: answerOnQuestion
        }
        if(nameOfQuestion && answerOnQuestion) {
            questionMutate(data);
        }
    }

    return (
        <form onSubmit={addQuestionFunction}>
            <div className="bg-[#0E111E] space-y-2 text-white p-3 rounded-md">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="wuwtl" className="font-medium">Name of the question</label>
                    <input 
                    name='nameOfQuestion'
                    type='text' 
                    value={nameOfQuestion} 
                    onChange={(e) => setNameOfQuestion(e.currentTarget.value)}
                    placeholder='Add question...'
                    className="inputCourseDetails" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="wuwtl" className="font-medium">Answer on the question</label>
                    <input 
                    name='answerOnQuestion'
                    type='text' 
                    value={answerOnQuestion} 
                    onChange={(e) => setAnswerOnQuestion(e.currentTarget.value)}
                    placeholder='Add answer on question...'
                    className="inputCourseDetails" />
                </div>
                <div className="flex justify-end">
                    <button className="bg-white text-black rounded-lg py-2 px-5">Add</button>
                </div>
            </div>
        </form>
    )
}

export default AddQuestion