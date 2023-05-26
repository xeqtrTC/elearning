"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Course = __importStar(require("../controllers/courseController"));
const multer_1 = __importDefault(require("../multer/multer"));
const middleware_1 = require("../middleware");
// GET
router.route('/getOneCourse/:name').get(Course.queryCourse);
router.route('/getAllCourses').get(Course.getAllCourses);
router.route('/getUsersCourses').get(Course.getUsersCourses);
router.route('/getLectures/:course_id').get(Course.getLecturesForCourse);
router.route('/getSingleCourseDetails/:courseId/:lessonID').get([middleware_1.verifySignUp.checkDidUserPurchaseCourseGuardian], Course.getSingleCourseDetails);
router.route('/listAllInstructors').get(Course.listAllInstructors);
router.route('/listOfCategories').get(Course.listOfCategories);
router.route('/listOfQuestions').get(Course.listOfQuestions);
router.route('/findOneInstructor/:name').get(Course.findOneInstructor);
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
router.route('/addLessonDetails').post(multer_1.default.single('video'), Course.addLessonDetails);
router.route('/addWhatYouLearnOnCourse').post(Course.addWhatYouLearnOnCourse);
router.route('/addWhatYouBuild').post(multer_1.default.single('image'), Course.addWhatYouBuild);
router.route('/addCourseToUser').post([
    middleware_1.verifySignUp.checkDidUserPurchaseCourse
], Course.addCourseToUser);
exports.default = router;
