import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { lessonDetails } from './lessonDetails.model';
import { Users } from './user.model';
import { Lesson } from './lesson.models';
import { Course } from './course.model';

export interface CourseCompletionAttributes {
    id?: number
    course_id?: number,
    user_id: number,
    date_completion: Date
}

interface CourseCompletionCreationAttributes extends Optional<CourseCompletionAttributes, 'id'> {}

@Table({ tableName: 'CourseCompletion'})
export class CourseCompletion extends Model<CourseCompletionAttributes, CourseCompletionCreationAttributes> implements CourseCompletionAttributes {
    
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false
    })
    id!: number

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    course_id!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    date_completion!: Date;

    @BelongsTo(() => Course, { foreignKey: 'course_id'})
    CourseCompletion!: Course

    @BelongsTo(() => Users, { foreignKey: 'user_id'})
    userCompletion!: Users
}