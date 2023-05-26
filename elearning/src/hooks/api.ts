import axios from "axios";
import { 
    addAnswerToQuestionProps, 
    addCategoryProps, 
    addCourseProps, 
    addIncludeProps, 
    addinstructorProps, 
    addLectureProps, 
    addPrerequisitesProps, 
    addQuestionAndAnswerProps, 
    addRoleProps, 
    addRoleToUserProps, 
    addSubscribeEmailProps, 
    addWhatWillYouLearnProps, 
    AllCourseDetailsArray, 
    courseCollectionProps, 
    courseDetailsArraySecond, 
    courseDetailsQuery, 
    courseDetailsQueryProps, 
    editUserProfileProps, 
    getUserInfoProps, 
    listFreqQuestionsProps, 
    ListInstructorsProps, 
    listOfCategoriesProps, 
    loginInterface, 
    mappedMessagesProps, 
    registerInterface, 
    removeOneChatProps, 
    removeRoleProps, 
    removeSubProps, 
    rolesProps, 
    sendEmailToSubsProps, 
    singleInstructorProps, 
    updateRoleProps, 
    userInfoData, 
    userListProps, 
    verifyTokenProps, 
    whoAmIProps 
} from "../components/Hooks/interfaces";

const eLearningAPI = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
    withCredentials: true
})

const userRoute = 'users';
const courseRoute = 'courses'
const roleRoute = 'roles'
const socketRouter = 'sockets'

export const addUser = async (userInformation: registerInterface) => {
    return await eLearningAPI.post(`/${userRoute}/addUser`, userInformation)
}

export const loginUser = async (data: loginInterface) => {
    console.log(data);
    return await eLearningAPI.post(`/${userRoute}/login`, data)
}

export const logoutUser = async () => {
    return await eLearningAPI.post(`${userRoute}/logout`)
}

export const getAllCourses = async () => {
    const response = await eLearningAPI.get<AllCourseDetailsArray[]>(`/${courseRoute}/getAllCourses`);
    return response.data
}
export const getSingleCourse = async (name: string) => {
    const response = await eLearningAPI.get<courseDetailsArraySecond>(`/${courseRoute}/getOneCourse/${name}`);
    return response.data
}
export const purchaseCourseByUser = async (courseCollection: courseCollectionProps) => {
    console.log(courseCollection);
    return await eLearningAPI.post(`/${courseRoute}/addCourseToUser`, courseCollection);
}
export const getCoursesForUser = async () => {
    const response = await eLearningAPI.get<AllCourseDetailsArray[]>(`${courseRoute}/getUsersCourses`);
    return response.data
}
export const addCourse = async (data: addCourseProps) => {
    return eLearningAPI.post(`${courseRoute}/addCourse`, data)
}
export const whatWillYouLearnAPI = async (dataProps: addWhatWillYouLearnProps) => {
    return eLearningAPI.post(`${courseRoute}/addWhatYouLearnOnCourse`, dataProps)
}
export const whatWillYouBuildAPI = async (buildData: any) => {
    return eLearningAPI.post(`${courseRoute}/addWhatYouBuild`, buildData)
}
export const lessonDetailsAPI = async (buildData: any) => {
    console.log(buildData);
    return eLearningAPI.post(`${courseRoute}/addLessonDetails`, buildData)
}
export const addLectureAPI = async (data: addLectureProps) => {
    return eLearningAPI.post(`${courseRoute}/addLesson`, data)
}
export const getLecturesForCourse = async (course_id?: string) => {
    const response = await eLearningAPI.get(`${courseRoute}/getLectures/${course_id}`);
    return response.data
}
export const getSingleCourseDetails = async ({lessonID, courseId}: courseDetailsQueryProps) => {
    const response = await eLearningAPI.get<courseDetailsQuery>(`${courseRoute}/getSingleCourseDetails/${courseId}/${lessonID}`)
    console.log(response.data);
    return response.data
}
export const whoAmI = async () => {
    const response = await eLearningAPI.get<whoAmIProps>(`${userRoute}/whoAmI`);
    return response.data
}
export const getAllRoles = async () => {
    const response = await eLearningAPI.get<rolesProps[]>(`${userRoute}/getAllRoles`);
    return response.data;
}
export const addRole = async (roles: addRoleProps) => {
    return await eLearningAPI.post(`${roleRoute}/addRole`, roles)
}
export const removeRole = async (roles: removeRoleProps) => {
    return await eLearningAPI.post(`${roleRoute}/removeRole`, roles)
}
export const updateRoleNameAPI = async (roles: updateRoleProps) => {
    return await eLearningAPI.post(`${roleRoute}/updateRoleName`, roles)
}
export const getAllUsers = async () => {
    const response = await eLearningAPI.get<userListProps[]>(`${userRoute}/getAllUsers`)
    return response.data;
}
export const verifyRegisterToken =async ({ token }: verifyTokenProps) => {
    const response = await eLearningAPI.get(`${userRoute}/verifyAccountByToken/${token}`)
    return response.data
}
export const getUserInfoById = async ({ id }: getUserInfoProps) => {
    const response = await eLearningAPI.get<userInfoData>(`${userRoute}/findOneUserRoles/${id}`)
    return response.data
}
export const addRolesToUser = async (data: addRoleToUserProps) => {
    return await eLearningAPI.post(`${userRoute}/addRoleToUser`, data)
}
export const removeRoleFromUser = async (data: addRoleToUserProps) => {
    return await eLearningAPI.post(`${userRoute}/removeRoleFromUser`, data)
}
export const editUserProfile = async (data: editUserProfileProps) => {
    return await eLearningAPI.post(`${userRoute}/editUserProfile`, data)
}
export const addInstructor = async (data: addinstructorProps) => {
    return await eLearningAPI.post(`${courseRoute}/addInstructor`, data)
}
export const listAllInstructors = async () => {
    const response = await eLearningAPI.get<ListInstructorsProps[]>(`${courseRoute}/listAllInstructors`);
    return response.data
}
export const addCategory = async (data: addCategoryProps) => {
    return await eLearningAPI.post(`${courseRoute}/addCategory`, data)
}
export const getAllCategories = async () => {
    const response = await eLearningAPI.get<listOfCategoriesProps[]>(`${courseRoute}/listOfCategories`);
    return response.data
}
export const addQuestionToCourse = async (data: addQuestionAndAnswerProps) => {
    return await eLearningAPI.post(`${courseRoute}/addFreqQuestionsAndAnswer`, data)
}
export const ListOfQuestions = async () => {
    const response = await eLearningAPI.get<listFreqQuestionsProps[]>(`${courseRoute}/listOfQuestions`);
    return response.data
}
export const addAnswerToQuestion = async (data: addAnswerToQuestionProps) => {
    return await eLearningAPI.post(`${courseRoute}/addAnswerOnQuestions`, data)
}
export const addCourseIncludes = async (data: addIncludeProps) => {
    return await eLearningAPI.post(`${courseRoute}/addCourseIncludes`, data)
}
export const addPrerequisites = async (data: addPrerequisitesProps ) => {
    return await eLearningAPI.post(`${courseRoute}/addPrerequisites`, data);
}
export const getSingleInstructor = async (usernameOfInstructor: string) => {
    const response = await eLearningAPI.get<singleInstructorProps>(`${courseRoute}/findOneInstructor/${usernameOfInstructor}`)
    return response.data;
}
export const addSubscribeEmail = async (data: addSubscribeEmailProps) => {
    return await eLearningAPI.post(`${userRoute}/subscribeToEmail`, data)
}
export const checkUniqueIDunsubscribe = async (uniqueID: string) => {
    const response = await eLearningAPI.get(`${userRoute}/getEmailByUniqueID/${uniqueID}`)
    return response.data
}
export const removeSubscription = async (data: removeSubProps) => {
    return await eLearningAPI.post(`${userRoute}/removeSubscription`, data)
}
export const sendEmailToSubs = async (data: sendEmailToSubsProps) => {
    return await eLearningAPI.post(`${userRoute}/sendEmailToSubscribers`, data);
}
export const getAllLiveRooms = async () => {
    const response = await eLearningAPI.get(`${socketRouter}/getLiveRooms`)
    return response.data;
}
export const getAllLiveMessages = async () => {
    const response = await eLearningAPI.get<mappedMessagesProps[]>(`${socketRouter}/getLiveMessages`);
    return response.data
}
export const removeAllChats = async () => {
    return await eLearningAPI.post(`${socketRouter}/deleteAllChats`);
}
export const removeOneChat = async (data: removeOneChatProps) => {
    return await eLearningAPI.post(`${socketRouter}/deleteOneChat`, data)
}
export default eLearningAPI
