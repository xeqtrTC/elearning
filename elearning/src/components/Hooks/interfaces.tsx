import { Dispatch, FormEvent, MouseEvent, SetStateAction } from "react"
import { NavLinkProps } from "react-router-dom"

export interface loginInterface {
    username: string,
    password: string
}

export interface registerInterface {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface userAttributes {
    id: string,
    username: string,
    email: string,
    password: string
}
export interface roleAttributes {
    id: string,
    name: string
}
export interface errorString {
    error: string
}
export interface courseArray {
    course_id: number,
    createdAt: string,
    description: string,
    imageLink: string,
    instructor_id: number,
    levelOfCourse: string,
    title: string,
    updatedAt: string
}

export interface whatyoulearnProps {
    courseCourseId: number,
    createdAt: string,
    title: string,
    updatedAt: string,
    whatyoulearn_id: number
}

export interface whatyoubuildProps {
    courseCourseId: number,
    createdAt: string,
    updatedAt: string,
    wub_description: string,
    wub_id: number,
    wub_imageLink: string,
    wub_title: string
}

export interface lessonDetailsProps {
    createdAt: string,
    updatedAt: string,
    lessonDetail_id: number,
    lessonId: number,
    title: string,
    video_link: string,
    
}

export interface courseDetailsQuery {
    lessonDetail_id: number,
    lessonId: number,
    private: boolean,
    title: string,
    lessonDetail_fakeID: number,
    video_link: string,
    updatedAt: string,
    createdAt: string,
    isCompleted: boolean,
    lessonCompletion: {id: number, lessonDetails_id: number, user_id: number, date_completion: Date}
}

export interface lessonProps {
    courseCourseId: number,
    createdAt: string,
    updatedAt: string,
    description: string,
    details?: lessonDetailsVideoProps[],
    instructor_id: number,
    lesson_id: number,
    

}

export interface courseDetailsArrayProps {
    lessons: lessonProps[],
    setLessonIdFunction: (lessonSecond_id: number) => void
}

export interface AllCourseDetailsArray {
    course_id: number,
    createdAt: string,
    description: string,
    imageLink: string,
    lessons: lessonProps[],
    levelOfCourse: string,
    title: string,
    instructors: instructorListCourseDetails[]
    categoryId?: number
    updatedAt: string,
}

export interface enrollmentsProps {
    courseCourseId: number,
    createdAt: string,
    updatedAt: string,
    userId: number
    id: number,
}

export interface coursesForUserProps {
    course_id: number,
    createdAt: string,
    description: string,
    imageLink: string,
    levelOfCourse: string,
    title: string,
    private: boolean,
    overview: string,
    biggerOverview: string
    updatedAt: string,
    categoryId: number,
    lessons: lessonProps[]
    instructors: instructorListCourseDetails[]
}

export interface AllCoursesForUserProps {
    course_id: number,
    createdAt: string,
    description: string,
    imageLink: string,
    instructor_id: number,
    lessons: lessonProps[],
    levelOfCourse: string,
    title: string,
    updatedAt: string,
}

export interface courseDetailsArray {
    course_id: number,
    createdAt: string,
    description: string,
    imageLink: string,
    instructor_id: number,
    lessons: lessonProps[],
    levelOfCourse: string,
    title: string,
    updatedAt: string,
    whatyoubuilds: whatyoubuildProps[],
    whatyoulearns: whatyoulearnProps[]
}

export interface instructorListCourseDetails {
    descriptionOfInstructor: string,
    githubLink: string,
    id: number,
    instructorRole: string,
    linkedInLink: string,
    twitterLink: string,
    usernameOfInstructor: string,
    youtubeLink: string
}

export interface answerOnQuestionProps {
    id: number,
    freqQuestionId: number,
    answerOnQuestion: string,
    createdAt: string,
    updatedAt: string
}

export interface frequentlyAskedQuestionsProps {
    id: number,
    courseCourseId: number,
    createdAt: string,
    updatedAt: string
    freqQuestion?: answerOnQuestionProps[],
    nameOfQuestion: string,
}

export interface courseFreqQuestionProps {
    frequentlyAskedQuestions: frequentlyAskedQuestionsProps[]
}

export interface courseIncludesArrayProps {
    id: number,
    nameOfInclude: string
}

export interface prerequisitesArrayProps {
    id: number,
    nameOfPrerequisites: string
}
export interface courseDetailsArraySecond {
    course_id: number,
    createdAt: string,
    description: string,
    imageLink: string,
    instructor_id: number,
    lessons: lessonProps[],
    levelOfCourse: string,
    title: string,
    overview: string,
    biggerOverview: string
    updatedAt: string,
    prerequis: prerequisitesArrayProps[],
    courseIncludes: courseIncludesArrayProps[]
    freqQuestions: frequentlyAskedQuestionsProps[],
    whatyoubuild: whatyoubuildProps[],
    whatyoulearn: whatyoulearnProps[],
    instructors: instructorListCourseDetails[]
}

export interface courseFirstITemProps {
    nameOfNeeded: string
}

export interface courseFirstDetails {
    description?: string,
    imageLink: string,
    purchaseCourseFunction(courseId: number): void,
    courseId: number,
    courseIncludes: courseIncludesArrayProps[],
    prerequisites: prerequisitesArrayProps[],
    instructors: instructorListCourseDetails[]
}

export interface propsTest {
    whatyoulearns: whatyoulearnProps[]
}

export interface courseCollectionProps {
    courseId: number
}

export interface addCourseProps {
    title: string,
    description: string,
    imageLink: string,
    levelOfCourse: string,
    instructor_id: number | null,
    categoryId: number | null,
    overview: string,
    biggerOverview: string,
    isPrivate: string
}

export interface whatYouWantToAddProps {
    wuwtl: boolean,
    wwub: boolean,
    lecture: boolean,
    lectureFC: boolean,
    question: boolean,
    listQuestion: boolean
    includes: boolean,
    prerequisites: boolean
}

export interface addWhatWillYouLearnProps {
    title: string,
    course_id?: string
}

export interface whatWillYouBuildPropsTest {
    title: string,
    description: string,
    course_id?: string
    // course_id: string ,

}

export interface whatWillYouBuildProps {
    title: string,
    description: string,
    image: File | undefined,
    course_id?: string
    // course_id: string ,

}

export interface addLectureProps {
    description: string,
    courseCourseId?: string,
    instructor_id: string
}

export interface addLecturePropsTest {
    course_id?: string
}

export interface lectureProps {
    lesson_id: number,
    courseCourse: number,
    description: string,
    instructor_id: number,
    updatedAt: string
    createdAt: string,
}

export interface lessonDetailsVideoProps {
    createdAt: string,
    updatedAt: string,
    lessonDetail_id: number,
    lessonId: number,
    title: string,
    video_link: string,
    private: boolean,
    lessonDetail_fakeID: number
}

export interface lessonPropsVideos {
    lesson_id: number,
    courseId: number,
    description: string,
    instructor_id: number,
    details: courseDetailsQuery[],
    quizz: quizzProps[]
    updatedAt: string
    createdAt: string,
    isCompleted: boolean,
}

export interface courseDetailsWatchLectures {
    lessons: lessonPropsVideos[],
    name: string | undefined,
    setLessonID: Dispatch<SetStateAction<number | undefined>>
    lessonID: number | undefined,
    id?: string
}

export interface courseDetailsVideoProps {
    lessonID?: number
}

export interface watchLecturesProps {
    forwardLecture: ({ forwards, backwords}: {forwards: boolean, backwords: boolean}) => void;
}

export interface courseDetailsQueryProps {
    id?: number | undefined,
}

export interface errorStatusProps {
    errorNotAllowed?: number
}

export interface headerLinksProps {
    row: boolean
}

export interface rolesProps {
    id: number,
    name: string,
    updatedAt: string,
    createdAt: string
}

export interface addRoleProps {
    addRoleName: string
}

export interface removeRoleProps {
    id: number
}

export interface removeRoleFunctionProps {
    e: MouseEvent<SVGElement> 
    id: number
}

export interface updateRoleProps {
    id: number | null
    name: string
}

export interface userListProps {
    email: string,
    id: number,
    name: string,
    username: string
}

export interface rolesProps {
    id: number,
    name: string
}

export interface whoAmIProps {
    email: string,
    id: number,
    username: string,
    roles?: rolesProps[],
    loading: boolean
}

export interface RequirePageProps {
    allowedRoles: string
}

export interface AuthStatsProps {
    username: string,
    email: string
    roles: rolesProps[],
}

export interface doesUserBelongsProps {
    isAllowed: boolean
}

export interface verifyTokenProps { 
    token: string
}

export interface getUserInfoProps {
    id: number | null
}

export interface userInfoIDProps {
    userInfoID: number | null
    userInfoClose: () => void
}

export interface roleThatBelongOrToBeAdded {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface userInfoData {
    id: number,
    username: string,
    email: string,
    isVerificated: boolean,
    rolesThatBelong: roleThatBelongOrToBeAdded[],
    rolesToBeAdded: roleThatBelongOrToBeAdded[]
}

export interface dataInfoStateProps {
    id: number | null,
    username: string,
    email: string,
    verificated: string,
}

export interface addRoleToUserProps {
    idOfUser: number | null,
    idOfRole: number | null
}

export interface addRoleToUserFunctionProps {
    id: number
}

export interface editUserProfileProps {
    id: number | null,
    username: string,
    email: string
}

export interface addinstructorProps {
    nameOfInstructor: string,
    instructorRole: string,
    descriptionOfInstructor: string,
    biggerDescriptionOfInstructor: string,
    githubLink: string,
    linkedInLink: string,
    twitterLink: string,
    youtubeLink: string
}

export interface ListInstructorsProps {
    id: number,
    usernameOfInstructor: string,
    instructorRole: string,
    descriptionOfInstructor: string,
    biggerDescriptionOfInstructor: string,
    githubLink: string,
    linkedInLink: string,
    twitterLink: string,
    youtubeLink: string
}


export interface ListInstructorsPropsSecond {
    id: number,
    usernameOfInstructor: string,
    instructorRole: string,
    descriptionOfInstructor: string,
    githubLink: string,
    linkedInLink: string,
    twitterLink: string,
    youtubeLink: string
}


export interface listInstrucotrsSecondProps {
    listofinstructors: ListInstructorsPropsSecond[]
}

export interface addCategoryProps {
    nameOfCategory: string
}

export interface listOfCategoriesProps {
    id: number,
    nameOfCategory: string,
    updatedAt: string,
    createdAt: string
}

export interface addQuestionAndAnswerProps {
    courseId?: string,
    nameOfQuestion?: string,
    answerOnQuestion?: string
}

export interface listFreqQuestionsProps {
    id: number,
    courseCourseId: number,
    createdAt: string,
    updatedAt: string
    nameOfQuestion: string,
}

export interface addAnswerToQuestionProps {
    freqQuestionId: string,
    answerOnQuestion: string
}
export interface addIncludeProps {
    courseId?: string,
    nameOfInclude?: string
}
export interface addPrerequisitesProps {
    nameOfPrerequisites?: string,
    courseId?: string
}
export interface singleCourseNormalProps {
    course_id: number,
    createdAt: string,
    description: string,
    imageLink: string,
    levelOfCourse: string,
    title: string,
    private: boolean,
    overview: string,
    biggerOverview: string
    updatedAt: string,
    categoryId: number,
    lessons: lessonProps[]
    instructors: instructorListCourseDetails[]

}
export interface singleInstructorProps {
    id: number,
    usernameOfInstructor: string,
    instructorRole: string,
    descriptionOfInstructor: string,
    githubLink: string,
    linkedInLink: string,
    twitterLink: string,
    youtubeLink: string
    courses: singleCourseNormalProps[],

}

export interface InstructorButtonLinks {
    githubLink: string, 
    twitterLink: string, 
    youtubeLink: string, 
    linkedInLink: string 
}

export interface CourseListHolderProps {
    data?: AllCourseDetailsArray[]  
}

export interface addSubscribeEmailProps {
    email: string
}

export interface removeSubProps {
    uniqueID?: string
}

export interface sendEmailToSubsProps {
    text: string
}

export interface activeChatProps {
    name: string,
    socketId: string
}

export interface activeChatFirstProps {
    id: number
}
export interface liveMessagesProps {
    idOfRoom:string 
}
// export intwhatyoubuildsrface UserCreationAttributes extends Optional<userAttributes, 'id'> {}
// export interface roleCreationAttributes extends Optional<roleAttributes, 'id'> {}
export interface testpropsplease {
    e: FormEvent<HTMLInputElement>,
    socketId: string
}

export interface messageArrayProps {
    messages?: messageProps[]
    idOfRoom?: string
}

export interface messageProps {
    idOfRoom?: string,
    name: string   
    message: string,
}

export interface mappedMessagesProps {
    name: string,
    message: string
    idOfRoom?: string
}

export interface removeOneChatProps {
    idOfRoom?: string
}

export interface addLessonDetailsCompletionAttributes {
    user_id?: number,
    lessonDetail_id: number
}

export interface listBadgeProps {
    id: number,
    badgeImage: string,
    badgeName: string,
    updatedAt: string,
    createdAt: string
}

export interface requirmentBadgeProps {
    id: number,
    requirement: string,
    createdAt: string,
    updatedAt: string
}
export interface listBadgeCriteriaPros {
    id: number,
    requirementType_id: number,
    requirmentBadge: requirmentBadgeProps,
    createdAt: string,
    updatedAt: string
}

export interface mapQuestionInputsProps {
    id: string,
    question: string,
    numberOfInputs: number
}
export interface mapAnswersInputProps {
    id: string,
    idOfQuestion: string,
    answer: string,
    numberOfAnswers: number,
    isCorrect: string
}

export interface zodTypeCreateQuizz {
    quizzName: string,
    quizzDescription: string,
    mapQuestionInputs: mapQuestionInputsProps[],
    mapAnswersInput: mapAnswersInputProps[]
}

export interface quizzProps {
    lesson_id: number,
    quizzFakeId: number,
    quizz_id: number,
    quizz_name: string
    quizz_description: string,
    quizzQues?: quizzQuestionProps[]
}

export type quizzOrVideoProps = quizzProps | courseDetailsQuery

export interface quizzOrVideoPropsType {
    data: quizzOrVideoProps;
  }
export interface quizzQuestionProps {
    quizz_id: number,
    quizz_text: string,
    quizzQuestion_id: number,
    quizzAnswers: quizzAnswerProps[]
}

export interface quizzAnswerProps {
    quizz_answer_id: number,
    quizz_question_id: number,
    quizz_isAnswerCorrect: boolean,
    quizz_answer_text: string,
}

export interface leftsidePropsVideo {
    description: string,
    lesson_id: number,
    isCompleted: boolean,
    details: lessonDetailsVideoProps[],
    quizz: quizzProps[]
    id?: string
}

export interface editQuizzAnswer {
    selectedAnswer: number | null,
    editValue: string,
    isAnswerCorrect: boolean
}
export interface editQuizzQuestion {
    selectedAnswer: number | null,
    editValue: string,
}

