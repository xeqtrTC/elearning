import { AxiosError, isAxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { addCourseProps, addinstructorProps, editQuizzAnswer, editQuizzQuestion, whatWillYouBuildPropsTest, zodTypeCreateQuizz } from "../components/Hooks/interfaces"
import { addAnswerToQuestion, addBadge, addBadgeCriteria, addCategory, addCourse, addCourseIncludes, addInstructor, addLectureAPI, addLessonDetailsCompletion, addPrerequisites, addQuestionToCourse, addRequirmentType, addReview, addRolesToUser, createQuizz, deleteQuizz, editUserProfile, lessonDetailsAPI, logoutUser, purchaseCourseByUser, removeAllChats, removeOneChat, removeRoleFromUser, sendEmailToSubs, updateQuizzAnswer, updateQuizzQuestion, whatWillYouBuildAPI, whatWillYouLearnAPI } from "./api"
import UseContextState from "./UseELearningContext"
import { UseFormReset } from "react-hook-form/dist/types"
interface addCategoryState { 
    setNameOfCategory: Dispatch<SetStateAction<string>>
}
interface addCourseState {
    setData: Dispatch<SetStateAction<addCourseProps>>
}
interface addInstructorState {
    setData: Dispatch<SetStateAction<addinstructorProps>>
}
interface addIncludeState {
    setNameOfInclude: Dispatch<SetStateAction<string>>
}
interface addLectureState {
    setDescription: Dispatch<SetStateAction<string>>
}
interface addlessonDetailsState {
    setTitle: Dispatch<SetStateAction<string>>
    setSelectedFile: Dispatch<SetStateAction<File | null>>
    setPrivateLesson: Dispatch<SetStateAction<string>>
}
interface addPrerequisitesState {
    setNameOfPrerequisites: Dispatch<SetStateAction<string>>
}
interface addQuestionState {
    setAnswerOnQuestion: Dispatch<SetStateAction<string>>
    setNameOfQuestion: Dispatch<SetStateAction<string>>
}
interface addWhatYouLearnState {
    setTitle: Dispatch<SetStateAction<string>>
}
interface addAnswerToQuestionState {
    setAnswerOnQuestion: Dispatch<SetStateAction<string>>
}
interface addWYBState {
    setWub_data: Dispatch<SetStateAction<whatWillYouBuildPropsTest>>
    course_id?: string,
    setSelectedImage: Dispatch<SetStateAction<File | null>>
}
interface sendEmailState {
    setText: Dispatch<SetStateAction<string>>
}
interface editQuizzState {
    setDataToBeSetAnswer: Dispatch<SetStateAction<editQuizzAnswer>>
}
interface editQuestionQuizzState {
    setDataToBeSetQuestion: Dispatch<SetStateAction<editQuizzQuestion>>
}
export const editUserMutation = () => {
    const { error, setError } = UseContextState(); 
    return useMutation(editUserProfile, {
        onSuccess: () => {
            console.log('radi')
        },
        onError: (error: Error | AxiosError) => {
            if(isAxiosError(error)) {
                setError(error?.response?.data?.message)
            }
        }
    })
}
export const removeRoleFromUserMutation = () => {
    const queryClient = useQueryClient();
    const { error, setError } = UseContextState(); 
    return useMutation(removeRoleFromUser, {
        onSuccess: () => {
            console.log('ovo radi')
            queryClient.invalidateQueries('getUserInfoByID')
        },
        onError: (error: Error | AxiosError) => {
            if (isAxiosError(error)) {
                setError(error?.response?.data.message)
            }
        }
    })
}
export const addRoleToUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addRolesToUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('getUserInfoByID')
        },
        onError: (error) => {
            console.log(error);
        }
    })
}
export  const addCategoryMutation = ({ setNameOfCategory }: addCategoryState) => {
    return useMutation(addCategory, {
        onSuccess: () => {
            setNameOfCategory('');
        }
    })
}
export const addCourseMutation = ({ setData }: addCourseState) => {
    return useMutation(addCourse, {
        onSuccess: () => {
            console.log('ovo')
            setData({
                title: '',
                description: '',
                imageLink: '',
                levelOfCourse: '',
                overview: '',
                biggerOverview: '',
                isPrivate: '',
                instructor_id: null,
                categoryId: null,
            })
        },
        onError: (error) => {
            console.log(error);
        }
    })
} 
export const addInstructorMutation = ({ setData }: addInstructorState) => {
    return useMutation(addInstructor, {
        onSuccess: () => {
            setData({
                nameOfInstructor: '',
                instructorRole: '',
                descriptionOfInstructor: '',
                biggerDescriptionOfInstructor: '',
                githubLink: '',
                linkedInLink: '',
                twitterLink: '',
                youtubeLink: ''
            })
        }
    })
}
export const addIncludeMutation = ({ setNameOfInclude }: addIncludeState) => {
    return useMutation(addCourseIncludes, {
        onSuccess: () => {
            setNameOfInclude('');
        }
    })
}
export const addLectureMutation = ({ setDescription }: addLectureState) => {
    return useMutation(addLectureAPI, {
        onSuccess: () => {
            setDescription('');
        },
        onError: (error) => {
            console.log(error);
        }
    })
}
export const addLessonDetailsMutation = ({ setTitle, setSelectedFile, setPrivateLesson }: addlessonDetailsState) => {
    return useMutation(lessonDetailsAPI, {
        onSuccess: () => {
            setTitle('');
            setSelectedFile(null);
            setPrivateLesson('0');
        },
        onError: (error) => {
            console.log(error);
        }
    })
}
export const addPrerequisitesMutation = ({ setNameOfPrerequisites }: addPrerequisitesState) => {
    return useMutation(addPrerequisites, {
        onSuccess: () => {
            setNameOfPrerequisites('');
        }
    })
}
export const addQuestionMutation = ({ setNameOfQuestion, setAnswerOnQuestion }: addQuestionState) => {
    return useMutation(addQuestionToCourse, {
        onSuccess: () => {
            setNameOfQuestion('');
            setAnswerOnQuestion('');
        }
    })
}
export const addWhatYouLearnMutation = ({ setTitle }: addWhatYouLearnState) => {
    return useMutation(whatWillYouLearnAPI, {
        onSuccess: () => {
            setTitle('');
        }
    })
}
export const addAnswerToQuestionMutation = ({ setAnswerOnQuestion }: addAnswerToQuestionState ) => {
    return useMutation(addAnswerToQuestion, {
        onSuccess: () => {
            setAnswerOnQuestion('');
        }
    })
}
export const addWhatYouBuildMutation = ({ setWub_data, course_id, setSelectedImage }: addWYBState) => {
    return useMutation(whatWillYouBuildAPI, {
        onSuccess: () => {
           setWub_data({
            title: '',
            description: '',
            course_id: course_id
           })
           setSelectedImage(null);
        },
        onError: (error) => {
            console.log(error);
        }
    })
}
export const sendEmailMutation = ({ setText }: sendEmailState) => {
    return useMutation(sendEmailToSubs, {
        onSuccess: () => {
            setText('');
        }
    })
}
export const purchaseCourseMutation = () => {
    const { error, setError } = UseContextState(); 
    return useMutation(purchaseCourseByUser, {
        onSuccess: () => {
            console.log('ovo')
        },
        onError: (error: Error | AxiosError ) => {
            console.log(error);
            if (isAxiosError(error)) {
                setError(error.response?.data.message)
            }
        }
    })
}
export const logoutMutation = () => {
    const navigate = useNavigate();
    return useMutation(logoutUser, {
        onSuccess: () => {
            console.log('ovo')
            navigate('/login')
        }
    })
}
export const removeAllChatsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(removeAllChats, {
        onSuccess: () => {
            console.log('ovo radi')
            queryClient.invalidateQueries('liveRooms')
        },
        onError: (error) => {
            console.log(error);
        }
    })
}
export const removeOneChatMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(removeOneChat, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'liveRooms' })
            console.log('mutate gotov')
        }
    })
}

export const addLessonDetailsCompletionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addLessonDetailsCompletion, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('lessonID')
            queryClient.invalidateQueries('singleCourseVideoDetails')
            console.log('ovo ra di')
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    })
}

export const addBadgeMutation = () => {
    return useMutation(addBadge, {
        onSuccess: () => {
            console.log('ovo radi')
        }
    })
}

export const addRequirmentTypeMutation = () => {
    return useMutation(addRequirmentType, {
        onSuccess: () => {
            console.log('radi')
        }
    })
}

export const addBadgeCriteriaMutation = () => {
    return useMutation(addBadgeCriteria, {
        onSuccess: () => {
            console.log('ovo')
        }
    })
}

export const addQuizMutation = () => {
    return useMutation(createQuizz, {
        onSuccess: () => {
            console.log('radi')
        },
        onError: (error) => {
            console.log(error);
        }
    })
}

export const removeQuizzMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteQuizz, {
        onSuccess: () => {
            queryClient.invalidateQueries(['listOfQuizz'])
        }
    })
}

export const updateQuizzAnswerMutation = ({setDataToBeSetAnswer}: editQuizzState) => {
    const queryClient = useQueryClient();
    return useMutation(updateQuizzAnswer, {
        onSuccess: () => {
            console.log('radi')
            queryClient.invalidateQueries(['findOneQuizz'])
            setDataToBeSetAnswer({
                isAnswerCorrect: false,
                selectedAnswer: null,
                editValue: ''
            })
        }
    })
}

export const updateQuizzQuestionMutation = ({ setDataToBeSetQuestion }: editQuestionQuizzState) => {
    const queryClient = useQueryClient();
    return useMutation(updateQuizzQuestion, {
        onSuccess: () => {
            console.log('radi')
            queryClient.invalidateQueries(['findOneQuizz'])
            setDataToBeSetQuestion({
                selectedAnswer: null,
                editValue: ''
            })
        }
    })
}

export const addReviewMutation = () => {
    return useMutation(addReview, {
        onSuccess: () => {
            console.log('radi')
        }
    })
}