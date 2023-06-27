import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, BelongsToMany, ForeignKey, HasOne } from 'sequelize-typescript';
import { InstructorsOnCourses, instructors } from './instructor.model';
import { Lesson } from './lesson.models';
import { prerequisites } from './prerequisites.models';
import { reviews } from './review.model';
import { whatyoubuild } from './whatyoubuild.model';
import { Whatyoulearn } from './whatyoulearn.model';
import { Category } from './category.model';
import { UsersCourses } from './userCourses';
import { CourseIncludes } from './courseIncludes.model';
import { Optional } from 'sequelize';
import { frequentlyAskedQuestions } from './frequentlyAskedQuestions.models';
import { CourseCompletion } from './CourseCompletion';

export interface courseAttributes {
  course_id?: number,
  title: string,
  description: Text,
  levelOfCourse: string,
  overview: Text,
  biggerOverview: Text,
  private: boolean,
  imageLink: string,
  categoryId: number
}

interface courseCreationAttributes extends Optional<courseAttributes, 'course_id'> {}



@Table({ tableName: 'Courses'})
export class Course extends Model<courseAttributes, courseCreationAttributes> implements courseAttributes {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true
  })
  course_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: Text;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  levelOfCourse!: string;

  @Column({
    type: DataType.TEXT
  })
  overview!: Text;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  biggerOverview!: Text;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  private!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  imageLink!: string





  @ForeignKey(() => Category) // Add ForeignKey decorator
  @Column
  categoryId!: number;

  @BelongsTo(() => Category, 'categoryId') // Specify the foreign key
  category!: Category;

  @BelongsToMany(() => instructors, () => InstructorsOnCourses)
  instructors!: instructors[]

  @HasMany(() => Lesson, { as: 'lessons', foreignKey: 'courseId'})
  lessons!: Lesson[]

  @HasMany(() => CourseIncludes, { foreignKey: 'courseIncludeID'} )
  courseIncludes!: CourseIncludes[]
  
  @HasMany(() => prerequisites, { foreignKey: 'courseId'})
  prerequis!: prerequisites[]

  @HasMany(() => reviews, { foreignKey: 'reviewCourseId'})
  review!: reviews[]

  @HasMany(() => whatyoubuild, { foreignKey: 'courseWhbID'})
  whatyoubuild!: whatyoubuild[]

  @HasMany(() => Whatyoulearn, { foreignKey: 'WHLCourseId'})
  whatyoulearn!: Whatyoulearn[]

  @HasMany(() => UsersCourses)
  UsersCourses!: UsersCourses[]

  @HasMany(() => frequentlyAskedQuestions, { foreignKey: 'courseFreqID'})
  freqQuestions!: frequentlyAskedQuestions[]

  @HasOne(() => CourseCompletion, { foreignKey: 'course_id'})
  courseCompletion!: CourseCompletion
}

// module.exports =  (sequelize, Sequelize) => {
//     const Course = sequelize.define("course", {
//       course_id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       title: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       description: {
//         type: Sequelize.TEXT,
//         allowNull: false
//       },
//       levelOfCourse: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       overview: {
//         type: Sequelize.TEXT,
//       },
//       biggerOverview: {
//         type: Sequelize.TEXT
//       },
//       private: {
//         type: Sequelize.BOOLEAN
//       },
//       imageLink: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//     });
//     Course.associate = (models) => {
//         Course.hasMany(models.lesson),
//         Course.hasMany(models.whatyoubuild),
//         Course.hasMany(models.whatyoulearn),
//         Course.hasMany(models.enrollment),
//         Course.hasMany(models.reviews),
//         Course.hasMany(models.courseIncludes),
//         Course.hasMany(models.prerequisites),
//         Course.hasMany(models.frequentlyAskedQuestions),
//         Course.belongsTo(models.categories, { as: 'category' }),
//         Course.belongsToMany(models.instructors, {
//           through: "instructors_of_course",
//           foreignKey: "courseId",
//           otherKey: "instructorId"
//         })
//     };
//     return Course
//   };