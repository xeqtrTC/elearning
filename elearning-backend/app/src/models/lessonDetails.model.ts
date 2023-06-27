import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import { Lesson } from './lesson.models';
import { Optional } from 'sequelize';
import { LessonDetailsCompletion } from './LessonsDetailsCompletion';
import { QuizzLessonsCombined } from './quizzLessonsCombined.model';

export interface lessonDetailsAttributes {
  lessonDetail_id?: number,
  title: Text,
  video_link: string | undefined,
  private: boolean,
  lessonId: number,
  lessonDetail_fakeID: number,
  isCompleted?: boolean
}
interface lessonDetailsCreationAttributes extends Optional<lessonDetailsAttributes, 'lessonDetail_id'> {}

@Table({ tableName: 'LessonDetails'})
export class lessonDetails extends Model<lessonDetailsAttributes, lessonDetailsCreationAttributes> implements lessonDetailsAttributes {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true
  })
  lessonDetail_id!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  title!: Text

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  video_link!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  private!: boolean

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  lessonDetail_fakeID!: number

  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  lessonId!: number

  @BelongsTo(() => Lesson, { foreignKey: 'lessonId'})
  lessonDetails!: Lesson

  @HasOne(() => LessonDetailsCompletion, { foreignKey: 'lessonDetails_id'})
  lessonCompletion!: LessonDetailsCompletion

  @HasMany(() => QuizzLessonsCombined, { foreignKey: 'lessonD_id'})
  quizzLessComb!: QuizzLessonsCombined[]
}
// module.exports =  (sequelize, Sequelize) => {
//     const LessonDetails = sequelize.define("lessondetails", {
//       lesson_id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       title: {
//         type: Sequelize.TEXT,
//         allowNull: false
//       },
//       video_link: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//       private: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false
//       }
//     });
//     LessonDetails.associate = (models) => {
//         LessonDetails.belongsTo(models.lesson, { foreignKey: 'lessonLessonId'})
//     };
    
//     return LessonDetails
//   };