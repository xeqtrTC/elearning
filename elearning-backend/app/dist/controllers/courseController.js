"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.listOfCategories = exports.addCategory = exports.addCourseIncludes = exports.addAnswerOnQuestions = exports.listOfQuestions = exports.addFreqQuestionsAndAnswer = exports.findOneInstructor = exports.listAllInstructors = exports.addInstructor = exports.addPrerequisites = exports.addReview = exports.getSingleCourseDetails = exports.getLecturesForCourse = exports.getUsersCourses = exports.addCourseToUser = exports.getAllCourses = exports.addWhatYouBuild = exports.addWhatYouLearnOnCourse = exports.queryCourse = exports.addLessonDetails = exports.addLesson = exports.addNewCourse = void 0;
const responses_1 = require("../middleware/responses");
const models_1 = __importDefault(require("../models"));
const Courses = models_1.default.course;
const Lesson = models_1.default.lesson;
const Whatyoubuild = models_1.default.whatyoubuild;
const Whatyoulearn = models_1.default.whatyoulearn;
const lessondetails = models_1.default.lessondetails;
const Enrollment = models_1.default.enrollment;
const Reviews = models_1.default.reviews;
const Prerequisites = models_1.default.prerequisites;
const Instructors = models_1.default.instructors;
const frequentlyAskedQuestions = models_1.default.frequentlyAskedQuestions;
const courseIncludes = models_1.default.courseIncludes;
const answerOnQuestions = models_1.default.answerOnQuestions;
const Categories = models_1.default.categories;
const addNewCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, instructor_id, imageLink, levelOfCourse, overview, biggerOverview, categoryId, isPrivate } = req.body;
    const addNewCourse = {
        title: title,
        description: description,
        imageLink: imageLink,
        levelOfCourse: levelOfCourse,
        overview: overview,
        biggerOverview: biggerOverview,
        categoryId: categoryId,
        private: Boolean(isPrivate)
    };
    try {
        const Course = yield Courses.create(addNewCourse);
        const courseId = Course.course_id;
        const instructorId = instructor_id;
        Course.addInstructors(parseInt(instructorId));
        return res.status(201).json({ message: "New course added" });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: error.message });
    }
});
exports.addNewCourse = addNewCourse;
const addLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, instructor_id, courseCourseId } = req.body;
    const addNewCourse = {
        description: description,
        instructor_id: instructor_id,
        courseCourseId: courseCourseId
    };
    try {
        yield Lesson.create(addNewCourse);
        return res.status(201).json({ message: 'New lesson added' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addLesson = addLesson;
const addLessonDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, lessonLessonId, privateLesson } = req.body;
    const video_link = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const addNewCourse = {
        title: title,
        video_link: video_link,
        lessonLessonId: lessonLessonId,
        private: privateLesson
    };
    console.log(addNewCourse);
    try {
        yield lessondetails.create(addNewCourse);
        return res.status(201).json({ message: 'New lesson detail added' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addLessonDetails = addLessonDetails;
const queryCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const courses = yield Courses.findOne({
            where: {
                title: name
            },
            include: [
                {
                    model: Lesson, include: [{ model: lessondetails, as: 'details' }]
                }, {
                    model: Whatyoubuild
                }, {
                    model: Whatyoulearn
                }, {
                    model: Instructors,
                    attributes: ['id', 'usernameOfInstructor', 'instructorRole', 'descriptionOfInstructor', 'githubLink', 'linkedInLink', 'twitterLink', 'youtubeLink'],
                    through: { attributes: [] }
                }, {
                    model: Reviews
                }, {
                    model: frequentlyAskedQuestions, attributes: ['id', 'nameOfQuestion'], include: [{ model: answerOnQuestions, as: 'freqQuestion' }]
                }, {
                    model: courseIncludes, attributes: ['id', 'nameOfInclude']
                }, {
                    model: Prerequisites, attributes: ['nameOfPrerequisites', 'id']
                }
            ]
        });
        if (!courses) {
            return res.status(404).json({ message: 'error' });
        }
        return res.status(200).json(courses);
    }
    catch (error) {
        console.log(error.message);
        return res.json({ message: error.message });
    }
});
exports.queryCourse = queryCourse;
const addWhatYouLearnOnCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, course_id } = req.body;
    const addWhatYouLearn = {
        title: title,
        courseCourseId: course_id
    };
    try {
        yield Whatyoulearn.create(addWhatYouLearn);
        return res.status(201).json({ message: 'Added new learn !' });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.addWhatYouLearnOnCourse = addWhatYouLearnOnCourse;
const addWhatYouBuild = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { title, description, course_id } = req.body;
    const image = (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.filename;
    const addWUB = {
        wub_imageLink: image,
        wub_title: title,
        wub_description: description,
        courseCourseId: course_id
    };
    try {
        yield Whatyoubuild.create(addWUB);
        return res.status(201).json({ message: 'Added new what you build' });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.addWhatYouBuild = addWhatYouBuild;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllCourses = yield Courses.findAll({
            include: [
                {
                    model: Lesson, include: [{ model: lessondetails, as: 'details' }]
                }, {
                    model: Instructors, through: { attributes: [] }
                }
            ]
        });
        return res.status(201).json(getAllCourses);
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.getAllCourses = getAllCourses;
const addCourseToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.body;
    const whatToAdd = {
        courseCourseId: courseId,
        userId: req.user.id
    };
    try {
        yield Enrollment.create(whatToAdd);
        return res.status(201).json({ message: "You successfully added this course to your store" });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.addCourseToUser = addCourseToUser;
const getUsersCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id;
    if (!userId) {
        return (0, responses_1.sendResponseFailure)(404, 'You are not logged', res);
    }
    try {
        const test = yield Courses.findAll({
            include: [
                { model: Enrollment, where: {
                        userId: userId
                    }
                }, {
                    model: Lesson, include: [{ model: lessondetails, as: 'details' }]
                }
            ]
        });
        return res.status(201).json(test);
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: error.message });
    }
});
exports.getUsersCourses = getUsersCourses;
const getLecturesForCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course_id = req.params.course_id;
    try {
        const lectures = yield Lesson.findAll({
            where: {
                courseCourseId: course_id
            }
        });
        return res.status(201).json(lectures);
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.getLecturesForCourse = getLecturesForCourse;
const getSingleCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonID = req.params.lessonID;
    try {
        const lectureDetails = yield lessondetails.findOne({
            where: {
                lesson_id: lessonID
            }
        });
        if (!lectureDetails) {
            return res.status(404);
        }
        return res.status(200).json(lectureDetails);
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.getSingleCourseDetails = getSingleCourseDetails;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { descriptionOfReview, courseCourseId } = req.body;
    const username = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.username;
    const toBeAdded = {
        username: username,
        descriptionOfReview: descriptionOfReview,
        courseCourseId: courseCourseId
    };
    try {
        yield Reviews.create(toBeAdded);
        return (0, responses_1.sendResponseSuccess)(200, "You added review", res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addReview = addReview;
const addPrerequisites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameOfPrerequisites, courseId } = req.body;
    const toBeAdded = {
        nameOfPrerequisites: nameOfPrerequisites,
        courseCourseId: courseId
    };
    console.log(toBeAdded);
    try {
        yield Prerequisites.create(toBeAdded);
        return (0, responses_1.sendResponseSuccess)(200, 'You added prerequisites', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addPrerequisites = addPrerequisites;
const addInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameOfInstructor, instructorRole, descriptionOfInstructor, biggerDescriptionOfInstructor, githubLink, linkedInLink, twitterLink, youtubeLink } = req.body;
    const toBeAdded = {
        usernameOfInstructor: nameOfInstructor,
        instructorRole: instructorRole,
        descriptionOfInstructor: descriptionOfInstructor,
        biggerDescriptionOfInstructor: biggerDescriptionOfInstructor,
        githubLink: githubLink,
        linkedInLink: linkedInLink,
        twitterLink: twitterLink,
        youtubeLink: youtubeLink
    };
    try {
        yield Instructors.create(toBeAdded);
        return (0, responses_1.sendResponseSuccess)(200, "You added instructor", res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addInstructor = addInstructor;
const listAllInstructors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allInstructors = yield Instructors.findAll();
        return (0, responses_1.sendResponseSuccess)(200, allInstructors, res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.listAllInstructors = listAllInstructors;
const findOneInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const singleInstructor = yield Instructors.findOne({
            where: {
                usernameOfInstructor: name
            },
            include: [{ model: Courses, include: [{ model: Lesson }, { model: Instructors, through: { attributes: [] } }], through: { attributes: [] } }]
        });
        if (singleInstructor) {
            return (0, responses_1.sendResponseSuccess)(200, singleInstructor, res);
        }
        return (0, responses_1.sendResponseFailure)(404, 'That instructor doesnt exists', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.findOneInstructor = findOneInstructor;
const addFreqQuestionsAndAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameOfQuestion, courseId, answerOnQuestion } = req.body;
    const toBeAdded = {
        nameOfQuestion: nameOfQuestion,
        courseCourseId: courseId
    };
    try {
        const QuestionAdded = yield frequentlyAskedQuestions.create(toBeAdded);
        const answerOnQuestionToBeAdded = {
            answerOnQuestion: answerOnQuestion,
            freqQuestionId: QuestionAdded.id
        };
        yield answerOnQuestions.create(answerOnQuestionToBeAdded);
        return (0, responses_1.sendResponseSuccess)(200, 'You added question!', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addFreqQuestionsAndAnswer = addFreqQuestionsAndAnswer;
const listOfQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield frequentlyAskedQuestions.findAll();
        return (0, responses_1.sendResponseSuccess)(200, questions, res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.listOfQuestions = listOfQuestions;
const addAnswerOnQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerOnQuestion, freqQuestionId } = req.body;
    const toBeAdded = {
        answerOnQuestion: answerOnQuestion,
        freqQuestionId: freqQuestionId
    };
    try {
        yield answerOnQuestions.create(toBeAdded);
        return (0, responses_1.sendResponseSuccess)(200, "You added answer on question!", res);
    }
    catch (error) {
        console.log(error);
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addAnswerOnQuestions = addAnswerOnQuestions;
const addCourseIncludes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameOfInclude, courseId } = req.body;
    const toBeAdded = {
        nameOfInclude: nameOfInclude,
        courseCourseId: courseId
    };
    try {
        yield courseIncludes.create(toBeAdded);
        return (0, responses_1.sendResponseSuccess)(200, 'You added includes', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addCourseIncludes = addCourseIncludes;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameOfCategory } = req.body;
    const toBeAdded = {
        nameOfCategory: nameOfCategory
    };
    try {
        yield Categories.create(toBeAdded);
        return (0, responses_1.sendResponseSuccess)(201, 'You created new category', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addCategory = addCategory;
const listOfCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCategories = yield Categories.findAll();
        return (0, responses_1.sendResponseSuccess)(200, listCategories, res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.listOfCategories = listOfCategories;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.body;
    try {
        const findCategory = yield Categories.findOne({
            categoryId: categoryId
        });
        if (findCategory) {
            findCategory.destroy();
            return (0, responses_1.sendResponseSuccess)(201, 'You deleted that category', res);
        }
        return (0, responses_1.sendResponseFailure)(401, 'That category doesnt exist', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.deleteCategory = deleteCategory;
