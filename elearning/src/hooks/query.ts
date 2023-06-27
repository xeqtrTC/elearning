import { useQuery, QueryCache, useQueryClient } from "react-query"
import { 
    checkUniqueIDunsubscribe, 
    findOneQuizz, 
    getAllCategories, 
    getAllCourses, 
    getAllLiveMessages, 
    getAllLiveRooms, 
    getAllRoles, 
    getAllUsers, 
    getCoursesForUser, 
    getLecturesForCourse, 
    getListOfQuizz, 
    getSingleCourse, 
    getSingleCourseVideos, 
    getSingleInstructor, 
    getUserInfoById, 
    listAllInstructors, 
    listAllLessonsForQuizz, 
    ListBadgeCriteriaForBadges, 
    ListBadgesAPI, 
    listLessonsPerCourse, 
    ListOfQuestions, 
    listRequirmentType, 
    verifyRegisterToken, 
    whoAmI 
} from "./api"

export const getCourseDetailsQuery = (name?: string) => {
    console.log('firing')
    return useQuery({
        queryKey: ['singleCourse', name],
        queryFn: () => getSingleCourse(name!),
        retry: false
    })
}
export const getCourseDetailsVideosQuery = (name?: string) => {
    console.log('firing')
    return useQuery({
        queryKey: ['singleCourseVideoDetails', name],
        queryFn: () => getSingleCourseVideos(name!),
        retry: false
    })
}
export const getAllCoursesQuery = () => {
    return useQuery({
        queryKey: ['coursesList'],
        queryFn: getAllCourses,
        retry: false
    })
}
export const whoAmIQuery = () => {
    return useQuery({
        queryKey: ['whoAmI'],
        queryFn: whoAmI,
        retry: false
    })
}
export const getAllRolesQuery = () => {
    return useQuery({
        queryKey: ['allRoles'],
        queryFn: getAllRoles
    })
}
export const getAllUsersQuery = () => {
    return useQuery({
        queryKey: ['allUsers'],
        queryFn: getAllUsers
    })
}
export const getCouresForUser = () => {
    return useQuery({
        queryKey: ['coursesForUser'],
        queryFn: getCoursesForUser,
        retry: false
    })
}
export const verifyTokenQuery = (token: string) => {
    return useQuery({
        queryKey: ['verifyToken', token],
        queryFn: () => verifyRegisterToken({token}),
        retry: false
    })
}
export const getUserInfo = (id: number | null) => {
    return useQuery({
        queryKey: ['getUserInfoByID', id],
        queryFn: () => getUserInfoById({id})
    })
}
export const getListAllInstructors = () => {
    return useQuery({
        queryKey: ['listAllInstructors'],
        queryFn: listAllInstructors
    })
}
export const getListOfCategories = () => {
    return useQuery({
        queryKey: ['listOfCategories'],
        queryFn: getAllCategories
    })
}
export const getListOfQuestions = () => {
    return useQuery({
        queryKey: ['listOfQuestions'],
        queryFn: ListOfQuestions
    })
}
export const getSingleInstructorQuery = (usernameOfInstructor: string) => {
    return useQuery({
        queryKey: ['singleInstructor', usernameOfInstructor],
        queryFn: () => getSingleInstructor(usernameOfInstructor),
        retry: false
    })
}
export const seeEmailByUniqueID = (uniqueID: string) => {
    return useQuery({
        queryKey: ['unsubscribeID', uniqueID],
        queryFn: () => checkUniqueIDunsubscribe(uniqueID),
        retry: false
    })
}
export const getAllLiveRoomsQuery = () => {
    return useQuery({
        queryKey: ['liveRooms'],
        queryFn: getAllLiveRooms
    })
}
export const getAllLiveMessagesQuery = () => {
    return useQuery({
        queryKey: ['liveMessages'],
        queryFn: getAllLiveMessages
    })
}
export const getLectureCourse = (course_id: string) => {
    return useQuery({
        queryKey: ['lectureList', course_id],
        queryFn: () => getLecturesForCourse(course_id)
    })
}
export const ListBadgesQuery = () => {
    return useQuery({
        queryKey: ['listBadges'],
        queryFn: ListBadgesAPI
    })
}
export const ListBadgeCriteriaForBadgesQuery = () => {
    return useQuery({
        queryKey: ['courseListBadges'],
        queryFn: ListBadgeCriteriaForBadges
    })
}
export const ListRequirmentTypeQuery = () => {
    return useQuery({
        queryKey: ['listRequirmentType'],
        queryFn: listRequirmentType
    })
}

export const ListAllLessonsForQuizzQuery = () => {
    return useQuery({
        queryKey: ['listAllLessonsForQuizz'],
        queryFn: listAllLessonsForQuizz
    })
}

export const listLessonsPerCourseQuery = (courseId: number) => {
    return useQuery({
        queryKey: ['listLessonsPerCourse', courseId],
        queryFn: () => listLessonsPerCourse(courseId)
    })
}

export const listAllQuizzQuery = () => {
    return useQuery({
        queryKey: ['listOfQuizz'],
        queryFn: getListOfQuizz
    })
}

export const findOneQuizzQuery = (id: string) => {
    return useQuery({
        queryKey: ['findOneQuizz', id],
        queryFn: () => findOneQuizz(id)
    })
}
