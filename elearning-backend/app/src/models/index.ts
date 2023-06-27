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
import { LessonDetailsCompletion } from "./LessonsDetailsCompletion";
import { LessonCompletion } from "./LessonCompletion";
import { CourseCompletion } from "./CourseCompletion";
import { BadgeForUsers } from "./badgesForUsers.model";
import { Badges } from "./badges.model";
import { BadgeCriteria } from "./badgeCritieria.model";
import { RequirementBadgesType } from "./requirementType.model";
import { Quizz } from "./Quizz.model";
import { QuizzAnswer } from "./QuizzAnswer.model";
import { QuizzQuestion } from "./QuizzQuestion.model";
import { QuizzLessonsCombined } from "./quizzLessonsCombined.model";

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
    InstructorsOnCourses,
    LessonDetailsCompletion,
    LessonCompletion,
    CourseCompletion,
    Badges,
    BadgeForUsers,
    BadgeCriteria,
    RequirementBadgesType,
    Quizz,
    QuizzAnswer,
    QuizzQuestion,
    QuizzLessonsCombined
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
  InstructorsOnCourses,
  LessonDetailsCompletion,
  LessonCompletion,
  Badges,
  CourseCompletion,
  BadgeForUsers,
  RequirementBadgesType,
  Quizz,
  QuizzAnswer,
  QuizzQuestion,
  QuizzLessonsCombined
}
