import { useQuery, QueryCache, useQueryClient } from "react-query"
import { 
    checkUniqueIDunsubscribe, 
    getAllCategories, 
    getAllCourses, 
    getAllLiveMessages, 
    getAllLiveRooms, 
    getAllRoles, 
    getAllUsers, 
    getCoursesForUser, 
    getLecturesForCourse, 
    getSingleCourse, 
    getSingleInstructor, 
    getUserInfoById, 
    listAllInstructors, 
    ListOfQuestions, 
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
export const getAllCoursesQuery = () => {
    return useQuery({
        queryKey: ['coursesList'],
        queryFn: getAllCourses
    })
}
export const whoAmIQuery = () => {
    return useQuery({
        queryKey: ['whoAmI'],
        queryFn: whoAmI,
        retry: 3
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



