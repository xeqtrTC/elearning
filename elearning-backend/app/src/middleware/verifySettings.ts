import { sendResponseFailure } from './responses';
import { EmailSubscription, Lesson, Quizz, Role, Users, UsersCourses, lessonDetails } from '../models/index' 
import { Request, Response, NextFunction } from 'express'

export const checkUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body
    const checkUsername = await Users.findOne({
        where: {
            username: username
        }
    })
    if(checkUsername) {
        return res.status(400).json({ message: 'Failed, username already exist!'})
    }
    const checkEmail = await Users.findOne({
        where: {
            email: email
        }
    })
    if(checkEmail) {
        return res.status(400).json({ message: 'Failed, email already exists!'})
    }
    next();
}

export const checkDoesUserExist = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    const checkUsername = await Users.findOne({
        where: {
            username: username
        }
    })

    if (checkUsername) {
        next();
        return
    }
    return res.status(401).json({ message: "That client doesn't exist"})
}

export const checkRoleExisted = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.roles) {
        for (const role of req.body.roles) {
            if(!Role.name.includes(role)) {
                return res.status(400).json({ message: 'Failed, role doesnt exist!'})
            }
        }
    }
    next();
}

export const checkDidUserPurchaseCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.body;
    // @ts-ignore
    const userId = req.user?.id
    try {
        const checkDidUserPurchase = await UsersCourses.findOne({
            where: {
                courseUserId: courseId, userCourseId: userId
            }
        })
        if(checkDidUserPurchase) {
            return res.status(401).json({ message: 'You already purchased this course!'})
        }
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message})
    }
}

export const checkDidUserPurchaseCourseGuardian = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    // @ts-ignore
    const userId = req.user?.id
    try {
        const isQuizz = await Quizz.findOne({
            where: {
                quizzFakeId: id
            }
        })
        if (isQuizz) {
            next();
        }
        const checkIsModelPrivate = await lessonDetails.findOne({
            where: {
                lessonDetail_fakeID: id
            },
        })
        console.log(checkIsModelPrivate);
        if (checkIsModelPrivate === null) {
            return res.status(404);
        }
        const lessonModel = await Lesson.findOne({
            where: {
                lesson_id: checkIsModelPrivate?.lessonId
            }
        })
        const checkDidUserPurchase = await UsersCourses.findOne({ 
            where: {
                courseUserId: lessonModel?.courseId, userCourseId: userId
            }
        })
        console.log(lessonModel, checkDidUserPurchase);
       
        if (checkIsModelPrivate?.private === false) {
            next();
        } else if (checkIsModelPrivate?.private === true && checkDidUserPurchase === null) {
            return res.status(401).json({ message: 'You have to pay for this course'})
        } else  if (checkIsModelPrivate?.private === true && checkDidUserPurchase?.userCourseId === userId) {
            next();
        }
    } catch (error: any) {
        console.log('erroraaaaaa', error)
        return res.status(401).json({ message: error.message})
    }
}

export const checkDoesRoleExists = async (req: Request, res: Response, next: NextFunction) => {
    const { addRoleName } = req.body;
    try {
        const doesRoleExist = await Role.findOne({
            where: {
                name: addRoleName
            }
        })
        if (doesRoleExist) {
            return res.status(401).json({ message: 'That role already exists'})
        }
        next();

    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}

export const checkIsEmailSubscribed = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
        const findEmail = await EmailSubscription.findOne({
            where: {
                emailOfSub: email
            }
        })
        if (findEmail) {
            return sendResponseFailure(401, 'Email already subscribed', res)
        }
        next();
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

const verifySettings = {
    checkUsernameOrEmail: checkUsernameOrEmail,
    checkRoleExisted: checkRoleExisted,
    checkDidUserPurchaseCourse: checkDidUserPurchaseCourse,
    checkDidUserPurchaseCourseGuardian: checkDidUserPurchaseCourseGuardian,
    checkDoesRoleExists: checkDoesRoleExists,
    checkIsEmailSubscribed: checkIsEmailSubscribed
}

export default verifySettings;