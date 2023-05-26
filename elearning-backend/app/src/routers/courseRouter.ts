import express from 'express';
const router = express.Router();
import * as Course from '../controllers/courseController';
import upload from '../multer/multer';
import { verifySettings } from '../middleware';

// GET
router.route('/getOneCourse/:name').get(Course.queryCourse);
router.route('/getAllCourses').get(Course.getAllCourses);
router.route('/getUsersCourses').get(Course.getUsersCourses)
router.route('/getLectures/:course_id').get(Course.getLecturesForCourse);
router.route('/getSingleCourseDetails/:courseId/:lessonID').get(
     [verifySettings.checkDidUserPurchaseCourseGuardian],
     Course.getSingleCourseDetails);
router.route('/listAllInstructors').get(Course.listAllInstructors);
router.route('/listOfCategories').get(Course.listOfCategories);
router.route('/listOfQuestions').get(Course.listOfQuestions);
router.route('/findOneInstructor/:name').get(Course.findOneInstructor)

// POST.
router.route('/addCourse').post(Course.addNewCourse);
router.route('/addLesson').post(Course.addLesson);
router.route('/addReview').post(Course.addReview);
router.route('/addCategory').post(Course.addCategory);
router.route('/addPrerequisites').post(Course.addPrerequisites);
router.route('/addInstructor').post(Course.addInstructor);
router.route('/addFreqQuestionsAndAnswer').post(Course.addFreqQuestionsAndAnswer);
router.route('/addAnswerOnQuestions').post(Course.addAnswerOnQuestions);
router.route('/addCourseIncludes').post(Course.addCourseIncludes);
router.route('/addLessonDetails').post(upload.single('video'), Course.addLessonDetails);
router.route('/addWhatYouLearnOnCourse').post(Course.addWhatYouLearnOnCourse)
router.route('/addWhatYouBuild').post(upload.single('image'), Course.addWhatYouBuild)
router.route('/addCourseToUser').post(
     [verifySettings.checkDidUserPurchaseCourse],
     Course.addCourseToUser
)



export = router