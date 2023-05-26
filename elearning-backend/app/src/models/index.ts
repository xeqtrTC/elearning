import { Sequelize } from "sequelize-typescript";
import dbConfig from '../config/dbConfig'
import { UsersCourses } from "./userCourses";
import { AnswerOnQuestion } from "./answerOnQuestions.models";
import { Category } from "./category.model";
import { Course } from "./course.model";
import  { CourseIncludes } from "./courseIncludes.model"
import { EmailSubscription } from "./emailSubscription.model";
import { frequentlyAskedQuestions } from "./frequentlyAskedQuestions.models";
import { instructors } from "./instructor.model";
import { lessonDetails } from "./lessonDetails.model";
import { Lesson } from "./lesson.models";
import { liveRoomMessages } from "./liveRoomMessages.model";
import { LiveRooms } from "./liveRooms.model";
import { PasswordResetToken } from "./passwordResetToken.model";
import { prerequisites } from "./prerequisites.models";
import { reviews } from "./review.model";
import { Role } from "./role.model";
import { RoleUsers } from "./role.model";
import { Users } from "./user.model";
import { whatyoubuild } from "./whatyoubuild.model";
import { Whatyoulearn } from "./whatyoulearn.model";
import { InstructorsOnCourses } from "./instructor.model";

const sequelize = new Sequelize({
  database: dbConfig.DB,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  dialect: 'mysql',
  logging: false
})

try {
  sequelize.addModels([
    Users,
    Course,
    whatyoubuild,
    Role,
    AnswerOnQuestion,
    Category,
    instructors,
    CourseIncludes,
    frequentlyAskedQuestions,
    EmailSubscription,
    UsersCourses,
    lessonDetails,
    Lesson,
    LiveRooms,
    liveRoomMessages,
    prerequisites,
    PasswordResetToken,
    reviews,
    RoleUsers,
    Whatyoulearn,
    InstructorsOnCourses
  ])
  
} catch (error: any) {
  console.log(error);
}

try {
   sequelize.sync();
  console.log('database works')
} catch (error: any) {
  console.log('something doesnt wokr', error)
}
export { 
  sequelize,
  UsersCourses,
  AnswerOnQuestion,
  Category,
  Course,
  CourseIncludes,
  EmailSubscription,
  frequentlyAskedQuestions,
  instructors,
  lessonDetails,
  Lesson,
  liveRoomMessages,
  LiveRooms,
  PasswordResetToken,
  prerequisites,
  reviews,
  Role,
  RoleUsers,
  Users,
  whatyoubuild,
  Whatyoulearn,
  InstructorsOnCourses
}
