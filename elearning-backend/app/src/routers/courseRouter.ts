import express from 'express';
const router = express.Router();
import * as Course from '../controllers/courseController';
import upload from '../multer/multer';
import { verifySettings, defensiveOptions } from '../middleware';

// GET
router.route('/getOneCourse/:name').get(Course.queryCourse);
router.route('/getAllCourses').get(Course.getAllCourses);
router.route('/getUsersCourses').get(Course.getUsersCourses);
router.route('/getLectures/:course_id').get(Course.getLecturesForCourse);
router.route('/getSingleCourseDetails/:id').get(
     [verifySettings.checkDidUserPurchaseCourseGuardian],
     Course.getSingleCourseDetails);
router.route('/listAllInstructors').get(Course.listAllInstructors);
router.route('/listOfCategories').get(Course.listOfCategories);
router.route('/listOfQuestions').get(Course.listOfQuestions);
router.route('/findOneInstructor/:name').get(Course.findOneInstructor);
router.route('/getSingleCourseDetailsForVideos/:nameOfCourse').get(Course.getSingleCourseDetailsForVideos);
router.route('/ListBadges').get([defensiveOptions.isUserAnAdmin],Course.ListBadges);
router.route('/queryCoursesForCreateBadges').get([defensiveOptions.isUserAnAdmin],Course.queryBadgesCriteriaForCreateBadges);
router.route('/listRequirmentType').get([defensiveOptions.isUserAnAdmin],Course.listRequirmentType);
router.route('/listAllLessonsForQuizz').get(Course.listAllLessonsForQuizz);
router.route('/listLessonsPerCourse/:courseId').get(Course.listLessonsPerCourse)
router.route('/listAllQuizz').get(Course.listAllQuizz);
router.route('/findOneQuizz/:id').get([defensiveOptions.isUserAnAdmin],Course.findOneQuizz);
// POST.
router.route('/addCourse').post([defensiveOptions.isUserAnAdmin], Course.addNewCourse);
router.route('/addLesson').post([defensiveOptions.isUserAnAdmin], Course.addLesson);
router.route('/addReview').post([defensiveOptions.isUserAnAdmin], Course.addReview);
router.route('/addCategory').post([defensiveOptions.isUserAnAdmin], Course.addCategory);
router.route('/addPrerequisites').post([defensiveOptions.isUserAnAdmin], Course.addPrerequisites);
router.route('/addInstructor').post([defensiveOptions.isUserAnAdmin], Course.addInstructor);
router.route('/addFreqQuestionsAndAnswer').post([defensiveOptions.isUserAnAdmin], Course.addFreqQuestionsAndAnswer);
router.route('/addAnswerOnQuestions').post([defensiveOptions.isUserAnAdmin], Course.addAnswerOnQuestions);
router.route('/addCourseIncludes').post([defensiveOptions.isUserAnAdmin], Course.addCourseIncludes);
router.route('/addLessonDetails').post( upload.single('video'), Course.addLessonDetails);
router.route('/addWhatYouLearnOnCourse').post([defensiveOptions.isUserAnAdmin], Course.addWhatYouLearnOnCourse);
router.route('/addWhatYouBuild').post([defensiveOptions.isUserAnAdmin], upload.single('image'), Course.addWhatYouBuild);
router.route('/addCourseToUser').post(
     [verifySettings.checkDidUserPurchaseCourse],
     Course.addCourseToUser
);
router.route('/createBadge').post([defensiveOptions.isUserAnAdmin], upload.single('imageOfBadge'), Course.createBadge);
router.route('/completeLessonDetails').post(Course.addLessonDetailsCompletion);
router.route('/createRequirmentType').post([defensiveOptions.isUserAnAdmin], Course.createRequirmentType);
router.route('/createBadgeCriteria').post([defensiveOptions.isUserAnAdmin], Course.createBadgeCriteria);
router.route('/createQuizz').post([defensiveOptions.isUserAnAdmin], Course.createQuizz)
router.route('/createQuizzQuestions').post([defensiveOptions.isUserAnAdmin], Course.createQuizzQuestions)
router.route('/updateQuizzAnswer').post([defensiveOptions.isUserAnAdmin], Course.updateQuizzAnswer)
router.route('/deleteQuizz').post([defensiveOptions.isUserAnAdmin], Course.deleteQuizz);
router.route('/updateQuizzQuestion').post([defensiveOptions.isUserAnAdmin], Course.updateQuizzQuestion)

export = router