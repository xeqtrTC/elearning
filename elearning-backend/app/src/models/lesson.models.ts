import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import { Course } from './course.model';
import { lessonDetails } from './lessonDetails.model';
import { Optional } from 'sequelize';
import { LessonCompletion } from './LessonCompletion';
import { Quizz } from './Quizz.model';
import { QuizzLessonsCombined } from './quizzLessonsCombined.model';


export interface lessonAttributes {
  lesson_id?: number,
  description: Text,
  instructor_id: number,
  courseId: number,
  isCompleted?: boolean
}
interface lessonCreateAttributes extends Optional<lessonAttributes, 'lesson_id'> {}


@Table({ tableName: 'Lessons'})
export class Lesson extends Model<lessonAttributes, lessonCreateAttributes> implements lessonAttributes {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true
  })
  lesson_id!: number

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: Text;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  instructor_id!: number

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  courseId!: number

  @BelongsTo(() => Course, { as: 'course', foreignKey: 'courseId'})
  course!: Course
  
  @HasMany(() => lessonDetails, { as: 'details', foreignKey: 'lessonId'})
  details!: lessonDetails[]

  @HasMany(() => Quizz, { foreignKey: 'lesson_id'})
  quizz!: Quizz[]

  @HasMany(() => QuizzLessonsCombined, { foreignKey: 'lesson_id'})
  quzzLessonsComb!: QuizzLessonsCombined[]

  @HasOne(() => LessonCompletion, { foreignKey: 'lesson_id'})
  lessonComplete!: LessonCompletion

 
}
// module.exports =  (sequelize, Sequelize) => {
//     const Lesson = sequelize.define("lesson", {
//       lesson_id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       description: {
//         type: Sequelize.TEXT,
//         allowNull: false
//       },
//       instructor_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//     });
//     Lesson.associate = (models) => {
//         Lesson.belongsTo(models.course)
//         Lesson.hasMany(models.lessondetails, { foreignKey: 'lessonLessonId', as: 'details'})
//     };
//     return Lesson
//   };