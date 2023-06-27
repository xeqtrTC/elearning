import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';

export interface WYLAttributes {
  whatyoulearn_id?: number,
  title: Text,
  WHLCourseId: number
}
interface WYLCreationAttributes extends Optional<WYLAttributes, 'whatyoulearn_id'> {}

@Table({ tableName: 'Whatyoulearn'})
export class Whatyoulearn extends Model<WYLAttributes, WYLCreationAttributes> implements WYLAttributes {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true
  })
  whatyoulearn_id!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  title!: Text

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  WHLCourseId!: number;

  @BelongsTo(() => Course, { foreignKey: 'WHLCourseId'})
  course!: Course
}
