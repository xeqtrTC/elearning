import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { lessonDetails } from './lessonDetails.model';
import { Users } from './user.model';
import { Lesson } from './lesson.models';

export interface lessonsCompletionAttributes {
    id?: number
    lesson_id?: number,
    user_id: number,
    date_completion: Date
}

interface lessonCompletionCreationAttributes extends Optional<lessonsCompletionAttributes, 'id'> {}


@Table({ tableName: 'LessonCompletion'})
export class LessonCompletion extends Model<lessonsCompletionAttributes, lessonCompletionCreationAttributes> implements lessonsCompletionAttributes {
    
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false
    })
    id!: number

    @ForeignKey(() => Lesson)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    lesson_id!: number;

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

    @BelongsTo(() => Lesson, { foreignKey: 'lesson_id'})
    lessonCompletion!: Lesson

    @BelongsTo(() => Users, { foreignKey: 'user_id'})
    userCompletion!: Users
}