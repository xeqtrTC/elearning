import { FormEvent, useEffect, useState } from "react";
import { listLessonsPerCourse } from "../../../hooks/api";
import { ListAllLessonsForQuizzQuery, listLessonsPerCourseQuery } from "../../../hooks/query"
import NavigationButtons from "../../../UI/NavigationButtons";
import { map, z, union, array, ZodType } from "zod";
import { v4 } from "uuid";
import { useFieldArray, useForm } from "react-hook-form";

import { mapAnswersInputProps, mapQuestionInputsProps, zodTypeCreateQuizz } from "../../Hooks/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { addQuizMutation } from "../../../hooks/mutate";

const CreateQuizz = () => {
    const [courseId, setCourseId] = useState<number | null>(null)
    const [dataValue, setDataValue] = useState<{quizzName: string, quizzDescription: string}>({
        quizzName: '',
        quizzDescription: ''
    })
    const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
    const [mapQuestionInputs, setMapQuestionInputs] = useState<mapQuestionInputsProps[]>([]);
    const [mapAnswersInput, setMapAnswerInputs] = useState<mapAnswersInputProps[]>([])
    const schema: ZodType<zodTypeCreateQuizz> = z.object({
        quizzName: z.string().min(5, { message: 'Minimum 4 letter of quizz description'}),
        quizzDescription: z.string().min(5, { message: 'Minimum 4 letter of quizz description'}),
        mapQuestionInputs: z.array(
            z.object({
                question: z.string().nonempty({ message: 'Please fill this'}), 
                id: z.string().nonempty(), 
                numberOfInputs: z.number()
            }
        )).min(4, {message: 'There should be minimum 4 questions'}),
        mapAnswersInput: z.array(
            z.object({
                answer: z.string().nonempty(), 
                id: z.string(), 
                idOfQuestion: z.string(), 
                numberOfAnswers: z.number(),
                isCorrect: z.string()
        })).min(16, { message: 'There should be atleast 16 answers, 4 per question'})
    })

    const { data: courseData } = ListAllLessonsForQuizzQuery();
    const { data: lessonData } = listLessonsPerCourseQuery(courseId!)
    useEffect(() => {
        if (courseData) {
            setCourseId(courseData![0].course_id)
            // setSelectedLesson(lessonData![0].lesson_id)
        }
    }, [courseData])
    
    console.log(courseId);
    
    const selectCourseToBeAdded = (e: FormEvent<HTMLSelectElement>) => {
        setCourseId(parseInt(e.currentTarget.value))
    }
    const selectLessonToBeAdded = (e: FormEvent<HTMLSelectElement>) => {
        setSelectedLesson(parseInt(e.currentTarget.value))
    }
    const { register, handleSubmit, formState: { errors, isValid }, reset, control} = useForm<zodTypeCreateQuizz>({resolver: zodResolver(schema)})
    const { fields: answerArrayInput, append: answerArrayAppend } = useFieldArray({
        control,
        name: 'mapAnswersInput'
        
    })
    const { fields: questionArrayInput, append: questionArrayAppend } = useFieldArray({
        control,
        name: 'mapQuestionInputs'
    })
    const { mutate } = addQuizMutation();
    console.log(questionArrayInput);

    const sendDataToBackend = (data:zodTypeCreateQuizz) => {
        console.log(data);
        const dataToBeAdded = {
            lessonId: selectedLesson!,
            quizzName: data.quizzName!,
            quizzDescription: data.quizzDescription,
            questions: data.mapQuestionInputs,
            answers: data.mapAnswersInput,

        }
        try {
            mutate(dataToBeAdded);
            reset()
            answerArrayAppend([]); // Resets answerArrayInput state
            questionArrayAppend([]); // Resets questionArrayInput state
        } catch (error: any) {
            console.log(error);
        }
        console.log(dataToBeAdded);
    }
    
    return (
        <div> 
            <NavigationButtons linkTo='homepage/createquestionsquizz' nameOfButton="Link to create a question" />
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label className="labelEdit">List of courses, if there is only 1 course, lesson will auto-fetch</label>
                    <select onChange={selectCourseToBeAdded} className="inputEditUser" >
                        {
                            courseData?.map((item) => {
                                const { lessons, title, course_id } = item;
                                return (
                                    <option key={course_id} value={course_id}>{title}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="labelEdit">List of lessons, pick the one you want to add quizz to.</label>
                    <select className="inputEditUser" onChange={selectLessonToBeAdded}>
                        {
                            lessonData?.map((item) => {
                                const { lesson_id, description } = item
                                return (
                                    <option key={lesson_id} value={lesson_id}>{description}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quizzName" className="labelEdit">Name of quizz</label>
                    <input type='text' id='quizzName' className="inputEditUser" placeholder='Quizz name'  {...register('quizzName')} />
                    {errors.quizzName && <span>{errors.quizzName.message}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quizzDescription" className="labelEdit">Description of quizz</label>
                    <input type='text'  id='quizzDescription' className="inputEditUser" placeholder='Quizz description'  {...register('quizzDescription')} />
                    {errors.quizzDescription && <span>{errors.quizzDescription.message}</span>}
                </div>
                <div>
                    
            </div>   
        </div>
        <div className="py-2">
            <button className="inputEditUserButton" onClick={() => questionArrayAppend({ question: '', id: v4(), numberOfInputs: questionArrayInput.length + 1 })}>Add questions</button>
        </div>
        <div className="flex flex-col space-y-1">
            {errors.mapAnswersInput && <span>{errors.mapAnswersInput.message}</span>}
            {errors.mapQuestionInputs && <span>{errors.mapQuestionInputs.message}</span>}                    
        </div>
        <div className="flex flex-col space-y-3">
            {
                questionArrayInput.map((itemQuestion, itemQuestionIndex) => (
                    <div className="flex flex-col space-y-2" key={itemQuestion.id}>
                        <div className="flex justify-between items-center">
                            <span>{itemQuestion.numberOfInputs} question</span>
                            <button className="inputEditUserButton" 
                            onClick={() => 
                            answerArrayAppend({isCorrect: '',answer: '', idOfQuestion: itemQuestion.id, id: v4(), numberOfAnswers: answerArrayInput.filter((item) => item.idOfQuestion === itemQuestion.id).length + 1})}>
                                Add answer
                            </button>
                        </div>
                        <input type='text'  
                        className="inputEditUser" 
                        {...register(`mapQuestionInputs.${itemQuestionIndex}.question` as const)} defaultValue={itemQuestion.question} />
                            {
                                answerArrayInput?.map((answerItem, answerItemIndex) => {
                                    if (itemQuestion.id === answerItem.idOfQuestion) {
                                        return (
                                            <div className="flex items-center space-x-2 space-y-2 ml-2" key={answerItem.id}>
                                                <span>{answerItem.numberOfAnswers}.</span>
                                                <input className='inputEditUser w-[95%]'  
                                                {...register(`mapAnswersInput.${answerItemIndex}.answer` as const )}  
                                                defaultValue={answerItem.answer} />
                                                <select
                                                {...register(`mapAnswersInput.${answerItemIndex}.isCorrect` as const)}
                                                >
                                                    
                                                    <option 
                                                    value='true'
                                                    >True</option>
                                                    <option value='false'
                                                    >False</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                })
                            }
                        
                    </div>
                ))
            }
        </div>
        <div className="py-2">
            <button onClick={handleSubmit(sendDataToBackend)} className="inputEditUserButton">Add this</button>
        </div>
    </div>
    )
}

export default CreateQuizz