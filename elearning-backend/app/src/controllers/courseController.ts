import { sendResponseFailure, sendResponseSuccess } from '../middleware/responses'
import { Request, Response } from 'express'
import { 
    Course,
    Lesson,
    Whatyoulearn,
    whatyoubuild,
    reviews,
    instructors,
    CourseIncludes,
    AnswerOnQuestion,
    Category,
    UsersCourses,
    lessonDetails,
    frequentlyAskedQuestions,
    prerequisites,
    InstructorsOnCourses,
    Users

} from '../models/index'
import { courseAttributes } from '../models/course.model';
import { lessonAttributes } from '../models/lesson.models';
import { lessonDetailsAttributes } from '../models/lessonDetails.model';
import { WYLAttributes } from '../models/whatyoulearn.model';
import { WHBAttributes } from '../models/whatyoubuild.model';
import { UsersCourseAttributes } from '../models/userCourses';
import { reviewAttributes } from '../models/review.model';
import { prerequisitesAttributes } from '../models/prerequisites.models';
import { instructorAttributes } from '../models/instructor.model';
import { freqAskedQuestionsAttributes } from '../models/frequentlyAskedQuestions.models';
import { answerAttributes } from '../models/answerOnQuestions.models';
import { courseIncludesAttributes } from '../models/courseIncludes.model';
import { categoryAttributes } from '../models/category.model';
// const Courses = db.course
// const Lesson = db.lesson
// const Whatyoubuild = db.whatyoubuild
// const Whatyoulearn = db.whatyoulearn
// const lessondetails = db.lessondetails;
// const Enrollment = db.enrollment;
// const Reviews = db.reviews
// const Prerequisites = db.prerequisites
// const Instructors = db.instructors
// const frequentlyAskedQuestions = db.frequentlyAskedQuestions
// const courseIncludes = db.courseIncludes;
// const answerOnQuestions = db.answerOnQuestions;
// const Categories = db.categories

export const addNewCourse = async (req: Request, res: Response) => {
    const { title, description, instructor_id, imageLink, levelOfCourse, overview, biggerOverview, categoryId, isPrivate } = req.body;
    const addNewCourse: courseAttributes = {
        title: title,
        description: description,
        imageLink: imageLink,
        levelOfCourse: levelOfCourse,
        overview: overview,
        biggerOverview: biggerOverview,
        categoryId: categoryId,
        private: Boolean(isPrivate)
    }
    try {
        const createCourse = await Course.create(addNewCourse)
        const courseId = createCourse.course_id
        await InstructorsOnCourses.create({
            courseId: courseId,
            instructorId: instructor_id
        })
        // createCourse.INstruc(parseInt(instructorId));
        return res.status(201).json({ message: "New course added"})
    } catch (error: any) {
        console.log(error)
        return res.status(401).json({ message: error.message})
    }
}

export const addLesson = async (req: Request, res: Response) => {
    const { description, instructor_id, courseCourseId } = req.body;
    const addNewLesson: lessonAttributes = {
        description: description,
        instructor_id: instructor_id,
        courseId: courseCourseId
    }
    try {
        await Lesson.create(addNewLesson);
        return res.status(201).json({ message: 'New lesson added'})
    } catch (error) {
        console.log(error);
    }
}

export const addLessonDetails = async (req: Request, res: Response) => {
    const { title, lessonLessonId, privateLesson } = req.body;
    const video_link = req?.file?.filename;
    const addLessonDetails: lessonDetailsAttributes = {
        title: title,
        video_link: video_link,
        lessonId: lessonLessonId,
        private: privateLesson
    }
    console.log(addLessonDetails)
    try {
        await lessonDetails.create(addLessonDetails);
        return res.status(201).json({ message: 'New lesson detail added'})
    } catch (error) {
        console.log(error);
    }
}

export const queryCourse = async (req: Request, res: Response) => {
    const queryName = req.params.name
    try {
        const courses = await Course.findOne({
            where: {
                title: queryName
            },
            include: [
            { 
                model: Lesson, include: [{ model: lessonDetails, as: 'details'}]
            }, {
                model: whatyoubuild
            }, {
                model: Whatyoulearn
            }, {
                model: instructors,
                attributes: ['id', 'usernameOfInstructor', 'instructorRole', 'descriptionOfInstructor', 'githubLink', 'linkedInLink', 'twitterLink', 'youtubeLink'],
                through: { attributes: []}
            },{
                model: reviews
            }, {
                model: frequentlyAskedQuestions, attributes: ['id', 'nameOfQuestion'], include: [{ model: AnswerOnQuestion, as: 'freqQuestion'}]
            }, {
                model: CourseIncludes, attributes: ['id', 'nameOfInclude']
            }, {
                model: prerequisites, attributes: ['nameOfPrerequisites', 'id']
            }
        ]
        }) 
        if (!courses) {
            return res.status(404).json({ message: 'error'})
        }
        return res.status(200).json(courses);
    } catch (error: any) {
        console.log(error.message)
        return res.json({ message: error.message })
    }
} 

export const addWhatYouLearnOnCourse = async (req: Request, res: Response) => {
    const { title, course_id } = req.body;
    const addWhatYouLearn: WYLAttributes = {
        title: title,
        WHLCourseId: course_id 
    }
    try {
        await Whatyoulearn.create(addWhatYouLearn)
        return res.status(201).json({ message: 'Added new learn !'})
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}

export const addWhatYouBuild = async (req: Request, res: Response) => {
    const { title, description, course_id } = req.body;
    const image = req?.file?.filename;
    const addWUB: WHBAttributes = {
        wub_imageLink: image,
        wub_title: title,
        wub_description: description,
        courseWhbID: course_id
    }
    try { 
        await whatyoubuild.create(addWUB)
        return res.status(201).json({ message: 'Added new what you build'})
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    // @ts-ignore
    console.log('REQ USER', req.user?.id)
    try {
        const getAllCourses = await Course.findAll({
            include: [
            { 
                model: Lesson, include: [{ model: lessonDetails, as: 'details'}]
            }, {
                model: instructors, through: { attributes: []}
            }
        ]
    }) 
        return res.status(201).json(getAllCourses)
    } catch (error: any) {
        return res.status(401).json({ message: error.message})
    }
}

export const addCourseToUser = async (req: Request, res: Response) => {
    console.log('USAO');
    const { courseId } = req.body;
    console.log(courseId);
    const whatToAdd: UsersCourseAttributes =  {
        courseUserId: courseId,
        // @ts-ignore
        userCourseId: req.user?.id
    }
    console.log(courseId);
    try { 
        await UsersCourses.create(whatToAdd)
        return res.status(201).json({ message: "You successfully added this course to your store"})
    } catch (error: any) {
        console.log(error);
        return res.status(401).json({ message: error.message })
    }
}

export const getUsersCourses = async (req: Request, res: Response) => {
   // @ts-ignore
    const userId = req.user?.id
    if (!userId) {
        return sendResponseFailure(404, 'You are not logged', res)
    }
    try { 
        const test = await Course.findAll({         
            include: [
                { model: UsersCourses, where: {
                userCourseId: userId
            }
        }, {
            model: Lesson, include: [{ model: lessonDetails, as: 'details'}]
        }
    ]
        })
        return res.status(201).json(test)
    } catch (error: any) {   
        console.log(error);
        return res.status(401).json({ message: error.message })
    }
}

export const getLecturesForCourse = async (req: Request, res: Response) => {
    const course_id = req.params.course_id;
    try {
        const lectures = await Lesson.findAll({
            where: {
                courseId: course_id
            }
        })
        return res.status(201).json(lectures)
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}

export const getSingleCourseDetails = async (req: Request, res: Response) => {
    const lessonID = req.params.lessonID
    try {
        const lectureDetails = await lessonDetails.findOne({
            where: {
                lessonDetail_id: lessonID
            }
        })
        if (!lectureDetails) {
            return res.status(404);
        }
        return res.status(200).json(lectureDetails);
    } catch (error: any) {
        console.log('error', error)
        return res.status(401).json({ message: error.message })
    }
}

export const addReview = async (req: Request, res: Response) => {
    const { descriptionOfReview, courseCourseId } = req.body;
    // @ts-ignore
    const username = req?.user?.username
    const toBeAdded: reviewAttributes = {
        usernameOfReview: username,
        descriptionOfReview: descriptionOfReview,
        reviewCourseId: courseCourseId
    }
    try {
        await reviews.create(toBeAdded);
        return sendResponseSuccess(200, "You added review", res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }

}

export const addPrerequisites = async (req: Request, res: Response) => {
    const { nameOfPrerequisites, courseId } = req.body;
    const toBeAdded: prerequisitesAttributes = {
        nameOfPrerequisites: nameOfPrerequisites,
        courseId: courseId
    }
    console.log(toBeAdded);
    try {
        await prerequisites.create(toBeAdded);
        return sendResponseSuccess(200, 'You added prerequisites', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const addInstructor = async (req: Request, res: Response) => {
    const { 
        nameOfInstructor, 
        instructorRole, 
        descriptionOfInstructor, 
        biggerDescriptionOfInstructor, 
        githubLink, 
        linkedInLink, 
        twitterLink, 
        youtubeLink } = req.body;
    
    const toBeAdded: instructorAttributes = {
        usernameOfInstructor: nameOfInstructor,
        instructorRole: instructorRole,
        descriptionOfInstructor: descriptionOfInstructor,
        biggerDescriptionOfInstructor: biggerDescriptionOfInstructor,
        githubLink: githubLink,
        linkedInLink: linkedInLink,
        twitterLink: twitterLink,
        youtubeLink: youtubeLink
    }
    try {
        await instructors.create(toBeAdded);
        return sendResponseSuccess(200, "You added instructor", res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const listAllInstructors = async (req: Request, res: Response) => {
    try {
        const allInstructors: instructorAttributes[] = await instructors.findAll();
        return sendResponseSuccess(200, allInstructors, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const findOneInstructor = async (req: Request, res: Response) => {
    const name = req.params.name;
    try {  
        const singleInstructor = await instructors.findOne({
            where: {
                usernameOfInstructor: name
            },
            include: [{ model: Course, include: [{ model: Lesson }, { model: instructors, through: { attributes: [] }}], through: { attributes: []} }]
        })
        if (singleInstructor) {
            return sendResponseSuccess(200, singleInstructor, res)
        }
        return sendResponseFailure(404, 'That instructor doesnt exists', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res);
    }
}

export const addFreqQuestionsAndAnswer = async (req: Request, res: Response) => {
    const { nameOfQuestion, courseId, answerOnQuestion } = req.body;
    const toBeAdded: freqAskedQuestionsAttributes = {
        nameOfQuestion: nameOfQuestion,
        courseFreqID: courseId 
    }
    try {
        const QuestionAdded = await frequentlyAskedQuestions.create(toBeAdded);

        const answerOnQuestionToBeAdded: answerAttributes = {
            answerOnQuestion: answerOnQuestion,
            freqQuestionId: QuestionAdded.id
        }
        await AnswerOnQuestion.create(answerOnQuestionToBeAdded)
        return sendResponseSuccess(200, 'You added question!', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const listOfQuestions = async (req: Request, res: Response) => {
    try {
        const questions: freqAskedQuestionsAttributes[] = await frequentlyAskedQuestions.findAll();
        return sendResponseSuccess(200, questions ,res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const addAnswerOnQuestions = async (req: Request, res: Response) => {
    const { answerOnQuestion, freqQuestionId } = req.body;
    const toBeAdded: answerAttributes = {
        answerOnQuestion: answerOnQuestion,
        freqQuestionId: freqQuestionId
    }
    try {
        await AnswerOnQuestion.create(toBeAdded)
        return sendResponseSuccess(200, "You added answer on question!", res)
    } catch (error: any) {
        console.log(error)
        return sendResponseFailure(401, error.message, res)
    }

}

export const addCourseIncludes = async (req: Request, res: Response) => {
    const { nameOfInclude, courseId } = req.body;
    const toBeAdded: courseIncludesAttributes = {
        nameOfInclude: nameOfInclude,
        courseIncludeID: courseId
    }
    try {
        await CourseIncludes.create(toBeAdded);
        return sendResponseSuccess(200, 'You added includes', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res )
    }
}

export const addCategory = async (req: Request, res: Response) => {
    const { nameOfCategory } = req.body;
    const toBeAdded: categoryAttributes = {
        nameOfCategory: nameOfCategory
    }
    try {
        await Category.create(toBeAdded);
        return sendResponseSuccess(201, 'You created new category', res) 
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const listOfCategories = async (req: Request, res: Response) => {
    try {
        const listCategories = await Category.findAll();
        return sendResponseSuccess(200, listCategories, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}



// in modui
export const deleteCategory = async (req: Request, res: Response) => {
    // const { categoryId } = req.body;

    // try {
    //     const findCategory = await Category.findOne({
    //         categoryId: categoryId
    //     })
    //     if (findCategory) {
    //         findCategory.destroy();
    //         return sendResponseSuccess(201, 'You deleted that category', res)
    //     }
    //     return sendResponseFailure(401, 'That category doesnt exist', res)
    // } catch (error: any) {
    //     return sendResponseFailure(401, error.message, res)

    // }
}

