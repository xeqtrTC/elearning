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
    Users,
    LessonCompletion,
    LessonDetailsCompletion,
    Badges,
    RequirementBadgesType,
    BadgeForUsers,
    Quizz,
    QuizzQuestion,
    QuizzAnswer,
    QuizzLessonsCombined

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
import { BadgeCriteria } from '../models/badgeCritieria.model'
import { v4 } from 'uuid';
import { getPdf } from './pdfController';

const generateRandomID = () => {
    const maxLength = 7;
    let id = '';
  
    while (id.length < maxLength) {
      const randomString = v4().replace(/-/g, '');
      const numericOnly = randomString.replace(/\D/g, ''); // Remove non-numeric characters
      id += numericOnly;
    }
  
    return id.slice(0, maxLength);
  };
  

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
        private: privateLesson,
        lessonDetail_fakeID: parseInt(generateRandomID())
    }
    console.log(addLessonDetails)
    try {
        const addedLessonD = await lessonDetails.create(addLessonDetails);
        await QuizzLessonsCombined.create({
            lesson_id: lessonLessonId,
            lessonD_id: addedLessonD.lessonDetail_id,
            quizz_id: null
        })
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
        },
        {
            model: instructors
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

export const getSingleCourseDetailsForVideos = async (req: Request, res: Response) => {
    const nameOfCourse = req.params.nameOfCourse
    try {
        const courseId = await Course.findOne({
            where: {
                title: nameOfCourse
            }
        })
        // @ts-ignore
            const listAllLessons = await Lesson.findAll({
                where: {
                    courseId: courseId?.course_id
                },
                include: [
                    {
                        model: QuizzLessonsCombined,
                        include: [
                            {
                                model: lessonDetails,
                            },
                            {
                                model: Quizz
                            }
                        ]
                        // include: [
                        //     {
                        //         model: LessonDetailsCompletion,
                        //         where: {
                        //             // @ts-ignore
                        //             user_id: req.user?.id ? req.user?.id : null
                        //         },
                        //         required: false
                        //     },
                            
                            
                        // ]
                    },
                ]
            })
            listAllLessons.map((item) => {
                if (item.lessonComplete !== null) {
                    item.setDataValue('isCompleted', true)
                } 
              
            })
            listAllLessons.map((item) => {
                item?.details?.map((item) => {
                    if (item.lessonCompletion !== null) {
                        item.setDataValue('isCompleted', true)
                    }
                })
            })
            return sendResponseSuccess(200, listAllLessons, res) 
            // @ts-ignore      
    } catch (error: any) {
        console.log(error);
        return sendResponseFailure(404, error.message, res)
    }

}

export const getSingleCourseDetails = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        //@ts-ignore
            const lectureDetails = await lessonDetails.findOne({
                where: {
                    lessonDetail_fakeID: id
                },
                include: [
                    {
                        model: LessonDetailsCompletion,
                        where: {
                            // @ts-ignore
                            user_id: req.user?.id ? req.user.id : null
                        },
                        required: false,
                        // attributes: []
                    }
                ]
            })
            
        if (!lectureDetails) {
            const findQuizz = await Quizz.findOne({
                where: {
                    quizzFakeId: id
                },
                include: [
                    {
                        model: QuizzQuestion, include: [{ model: QuizzAnswer }]
                    }
                ]
            })
            if (findQuizz) {
                return sendResponseSuccess(200, findQuizz, res)
            }
            return res.status(404);
        }
        const isCompleted = lectureDetails.lessonCompletion !== null;
        lectureDetails.setDataValue('isCompleted', isCompleted)
        return res.status(200).json(lectureDetails);
    } catch (error: any) {
        console.log('erroraaaaaaa', error)
        return res.status(401).json({ message: error.message })
    }
}

export const addReview = async (req: Request, res: Response) => {
    const { descriptionOfReview, reviewCourseId } = req.body;
    // @ts-ignore
    const toBeAdded: reviewAttributes = {
        username_id: req.user?.id!,
        descriptionOfReview: descriptionOfReview,
        reviewCourseId: reviewCourseId
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

// in category.model.ts neeeded id of category
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

export const addLessonDetailsCompletion = async (req: Request, res: Response) => {
    const { user_id, lessonDetail_id } = req.body
    console.log(lessonDetail_id, 'ovo')
    try {
        // nadjemo lesson detalj
        
        // nadji ili napravi lesson details completion
        const finishedLessonDetails = await LessonDetailsCompletion.findOrCreate({
            where: {
                // @ts-ignore
                user_id: req.user?.id,
                lessonDetails_id: lessonDetail_id,
                date_completion: new Date()
            }
        })
        // ako je napravljeno
        const [completionRecord, created] = finishedLessonDetails;
        if (created) {
            const lessonId = await lessonDetails.findOne({
                where: {
                    lessonDetail_id: lessonDetail_id
                }
            })
            // trazi svaki lesson detalj po idu
            const lessonsDetailsMap = await lessonDetails.findAll({
                where: {
                    lessonId: lessonId?.lessonId
                }
            })
            // mapuje preko lessonmap 
            const promises = lessonsDetailsMap.map(detail => {
                return LessonDetailsCompletion.findOne({
                where: {
                    lessonDetails_id: detail.lessonDetail_id,
                    // @ts-ignore
                    user_id: req.user?.id
                }
                });
            });        
            const isCompletedArray = await Promise.all(promises);
            const isCompleted = isCompletedArray.every(value => !!value);
            // ako je iscompleted true, dodati u lessoncomplete, mozda je korisnik zavrsio kurs? proveriti
            if (isCompleted) {
                console.log('zavrsena lekcija')
                const findLessonId = await lessonDetails.findOne({
                    where: {
                        lessonDetail_id: lessonDetail_id
                    }
                })
                await LessonCompletion.create({
                    lesson_id: findLessonId?.lessonId,
                    //@ts-ignore
                    user_id: req.user?.id,
                    date_completion: new Date()
                })
                 const lessonMap = await Lesson.findAll();
                 const secondPromise = lessonMap.map(item => {
                     return LessonCompletion.findOne({
                         where: {
                             lesson_id: item.lesson_id,
                            //@ts-ignore
                             user_id: req.user?.id
                         }
                     })
                 })
                 const isCourseCompleted = await Promise.all(secondPromise);
                 const didUserCompleteCourse = isCourseCompleted.every(value => !!value)
                 // zavrsio kurs
                 if (didUserCompleteCourse) {
                    console.log('zavrsio kurs')
                    const lessonFind = await Lesson.findOne({
                        where: {
                            lesson_id: lessonId?.lessonId
                        },
                        include: [
                            {
                                model: Course
                            }
                        ]
                    })
                    console.log(lessonFind);
                    // return sendResponseSuccess(201, lessonFind, res)
                    const findProperBadgeCriteria = await BadgeCriteria.findOne({
                        include: [
                            {
                                model: RequirementBadgesType,
                                where: {
                                    requirement: lessonFind?.course.title
                                },
                            },
                            {
                                model: Badges
                            }
                        ]
                        
                    })
                    if (findProperBadgeCriteria) {
                        // @ts-ignore
                        console.log(req.user?.id, findProperBadgeCriteria)
                        const findBadge = await Badges.findOne({
                            where: {
                                badge_id: findProperBadgeCriteria?.badges[0].badge_id
                            }
                        })
                        console.log(findBadge);
                        if (findBadge) {
                            await BadgeForUsers.create({
                                // @ts-ignore
                                user_id: req.user?.id,
                                badge_id: findBadge?.badge_id,
                                date_completion: new Date()
                            })
                            console.log('lets see', )
                            // @ts-ignore
                            getPdf({nameOfCourse: lessonFind?.course.title, nameOfUser: req.user.username, emailOfUser: req.user.email})

                        } else {
                            console.log('nema badge')
                        }

                    }
                 }

                

            }
            // console.log(isCompleted, 'a')
        }
        // if (LessonDetailQuery) {
        //     const listAllLessons = await Lesson.findAll({
        //         where: {
        //             lesson_id: LessonDetailQuery.lessonId
        //         }
        //     })
        //     if (listAllLessons) {}
        // }
        

        
        return sendResponseSuccess(201, 'You completed this!', res)
    } catch (error: any) {
        console.log(error);
        return sendResponseFailure(401, error.message, res)
    }
}

export const ListBadges = async (req: Request, res: Response) => {
    try {
        const listBadgesQuery = await Badges.findAll();
        return sendResponseSuccess(200, listBadgesQuery, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const queryBadgesCriteriaForCreateBadges = async (req: Request, res: Response) => {
    try {
        const listBadgeCriteria = await BadgeCriteria.findAll({
            include: [
                {
                    model: RequirementBadgesType
                }
            ]
        })
        return sendResponseSuccess(200, listBadgeCriteria, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const createBadge = async (req: Request, res: Response) => {
    const { nameOfBadge, badgeCriteriaId, title } = req.body;
    const imageOfBadge = req.file?.filename
    try {
        await Badges.create({
            badgeImage: imageOfBadge!,
            badgeName: nameOfBadge,
            badgeCriteriaId: badgeCriteriaId
        })
        return sendResponseSuccess(201, 'Success', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const createRequirmentType = async (req: Request, res: Response) => {
    const { reqType } = req.body;
    try {
        await RequirementBadgesType.create({
            requirement: reqType
        })
        return sendResponseSuccess(201, 'Created', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const createBadgeCriteria = async (req: Request, res: Response) => {
    const { reqType_id } = req.body;
    console.log(reqType_id, 'AAAAAAAA')
    try {
        await BadgeCriteria.create({
            requirementType_id: reqType_id
        })
        return sendResponseSuccess(201, 'You created badge criteria', res)
    } catch (error: any) {
        console.log(error);
        return sendResponseFailure(401, error.message, res)
    }
}

export const listRequirmentType = async (req: Request, res: Response) => {
    try {
        const requirmentType = await RequirementBadgesType.findAll();
        return sendResponseSuccess(200, requirmentType, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

const promisefn = ({answers, quizzQuestion_id }: {
    answers: {
        id: string,
        idOfQuestion: string,
        answer: string,
        numberOfAnswers: number
    }[],
    quizzQuestion_id: number
}  
    ) => {
    return new Promise(async(resolve, reject) => {
        try {
            for (const answerInsert of answers) {
                await QuizzAnswer.create({
                    quizz_answer_text: answerInsert.answer,
                    quizz_question_id: quizzQuestion_id,
                    quizz_isAnswerCorrect: true
                })

            }
            return resolve(true)
        } catch (error) {
            return reject(false);
        }
    })
}

export const createQuizz = async (req: Request, res: Response) => {
    const { quizzName, quizzDescription, lessonId, questions, answers }: {
        quizzName: string,
        quizzDescription: string,
        lessonId: number,
        questions: {
            id: string,
            question: string,
            numberOfInputs: number
        }[],
        answers: {
            id: string,
            idOfQuestion: string,
            answer: string,
            numberOfAnswers: number,
            isCorrect: string
        }[]
    }  = req.body;   
    const answersPerQuestion = 4;
    const numQuestions = questions.length;
    const numAnswers = answers.length
    try {
        const quizzCreation = await Quizz.create({
            quizz_name: quizzName,
            quizz_description: quizzDescription,
            lesson_id: lessonId,
            quizzFakeId: parseInt(generateRandomID())
        })

        await QuizzLessonsCombined.create({
            quizz_id: quizzCreation.quizz_id,
            lesson_id: lessonId
        })

        for (let i = 0; i < numQuestions; i++) {
            const questionInsert = questions[i]
            // access 4 times
            const questionCreation = await QuizzQuestion.create({
                quizz_text: questionInsert.question,
                quizz_id: quizzCreation.quizz_id
            })
            // console.log(i);
            const quizzQuestionId = questionCreation.quizzQuestion_id;
            const startIndex = i * answersPerQuestion; // Starting index for answers
            const endIndex = startIndex + answersPerQuestion; // Ending index for answers
            const slicedAnswers = answers.slice(startIndex, endIndex); // Extract answers for the current question
            console.log(startIndex, endIndex, quizzQuestionId, 'NOVI')
            for (const answerInsert of slicedAnswers) {
                const isCorrectTrue = answerInsert.isCorrect === 'true'
                await QuizzAnswer.create({
                  quizz_answer_text: answerInsert.answer,
                  quizz_question_id: quizzQuestionId,
                  quizz_isAnswerCorrect: isCorrectTrue,
                });
              }
            // const quizzQuestion_id = questionCreation.quizzQuestion_id
            // const test = await promisefn({answers, quizzQuestion_id})
            // console.log(test);
        }

        return sendResponseSuccess(201, 'You created quizz!', res)
    } catch (error: any) {
        console.log(error);
        return sendResponseFailure(401, error.message, res)
    }
}

export const createQuizzQuestions = async (req: Request, res: Response) => {
    const { quizzId, quizzText } = req.body;
    try {
        await QuizzQuestion.create({
            quizz_id: quizzId,
            quizz_text: quizzText
        })
        return sendResponseSuccess(201, 'You crated quizz question', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const findOneQuizz = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const findProperQuizz =  await Quizz.findOne({
            where: {
                quizz_id: id
            },
            include: [
                {
                    model: QuizzQuestion, include: [{ model: QuizzAnswer }]
                }
            ]
        })
        if (findProperQuizz) {
            return sendResponseSuccess(200, findProperQuizz, res);
        }
        return sendResponseFailure(404, 'That quizz doesnt exist', res);
    } catch (error: any) {  
        return sendResponseFailure(401, error.message, res)
    }
}

export const deleteQuizz = async (req: Request, res: Response) => {
    const { quizz_id } = req.body;
    console.log(quizz_id);
    try {
        const findQuizz = await Quizz.findOne({
            where: {
                quizz_id: quizz_id
            }
        })
        if (findQuizz) {
            const findQuestions = await QuizzQuestion.findAll({
                where: {
                    quizz_id: findQuizz?.quizz_id
                }
            })
            if (findQuestions) {
                const questionIds = findQuestions.map((item) => item.quizzQuestion_id)
                const findAnswers = await QuizzAnswer.findAll({
                    where: {
                        quizz_question_id: questionIds
                    }
                })
                const answersId = findAnswers.map((item) => item.quizz_answer_id)
                await QuizzAnswer.destroy({
                    where: {
                        quizz_answer_id: answersId
                    }
                })
                await QuizzQuestion.destroy({
                    where: {
                        quizzQuestion_id: questionIds
                    }
                })
                await findQuizz.destroy();
                return sendResponseSuccess(200, 'You deleted this quizz', res)
            }
        }
        return sendResponseFailure(404, 'That quizz doesnt exist', res)
    } catch (error: any) {
        console.log(error);
        return sendResponseFailure(401, error.message, res)
    }
}

export const listAllQuizz = async (req: Request, res: Response) => {
    try {
        const listOfQuizzies = await Quizz.findAll();
        if (listOfQuizzies) {
            return sendResponseSuccess(200, listOfQuizzies, res);
        }
        return sendResponseFailure(404, 'There isnt any quizz', res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res);
    }
}

export const listAllLessonsForQuizz = async (req: Request, res: Response) => {
    try {
        const listCourses = await Course.findAll({
            attributes: ['title', 'course_id']
        });
        return sendResponseSuccess(200, listCourses, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const updateQuizzQuestion = async (req: Request, res: Response) => {
    const { selectedAnswer, editValue } = req.body;

    try {
        const findProperQuestion = await QuizzQuestion.findOne({
            where: {
                quizzQuestion_id: selectedAnswer
            }
        })
        if (findProperQuestion) {
            findProperQuestion.quizz_text = editValue;
            await findProperQuestion.save();
            return sendResponseSuccess(201, 'Edited Quizz', res)
        }
        return sendResponseFailure(404, 'There isny any question', res)
    } catch (error: any) {
        return sendResponseFailure(404, error.message, res)
    }
}

export const updateQuizzAnswer = async (req: Request, res: Response) => {
    const { editValue, isAnswerCorrect, selectedAnswer } = req.body;
    try {
        const quizzAnswerFound = await QuizzAnswer.findOne({
            where: {
                quizz_answer_id: selectedAnswer
            }
        })
        if (quizzAnswerFound) {
            quizzAnswerFound.quizz_answer_text = editValue,
            quizzAnswerFound.quizz_isAnswerCorrect = isAnswerCorrect

            await quizzAnswerFound.save();
        }
        return sendResponseSuccess(201, 'You created answer for quizz', res)
    } catch (error: any) {  
        return sendResponseFailure(401, error.message, res )
    }
}

export const listLessonsPerCourse = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    try {
        const listLessons = await Lesson.findAll({
            where: {
                courseId: courseId
            },
            attributes: ['lesson_id', 'description']
        })
        return sendResponseSuccess(200, listLessons, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}