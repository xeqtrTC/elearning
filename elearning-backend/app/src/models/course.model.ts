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


  @ForeignKey(() => Category) 
  @Column
  categoryId!: number;

  @BelongsTo(() => Category, 'categoryId') 
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
