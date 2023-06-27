import { Optional } from "sequelize";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Quizz } from "./Quizz.model";
import { lessonDetails } from "./lessonDetails.model";
import { Lesson } from "./lesson.models";

export interface quizzLessonsCombinedAttributes {
    ql_id?: number,
    quizz_id: number | null,
    lesson_id: number,
    lessonD_id: number | null
}

interface quizzLessonsCombinedCreation extends Optional<quizzLessonsCombinedAttributes, 'ql_id'> {}

@Table({ tableName: 'quizzLessonsCombined'})
export class QuizzLessonsCombined extends Model<quizzLessonsCombinedAttributes,quizzLessonsCombinedCreation> implements quizzLessonsCombinedAttributes {
    
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ql_id!: number

    @ForeignKey(() => Lesson)
    @Column
    lesson_id!: number

    @ForeignKey(() => Quizz)
    @Column({
        allowNull: true
    })
    quizz_id!: number;

    @ForeignKey(() => lessonDetails)
    @Column({
        allowNull: true
    })
    lessonD_id!: number

    @BelongsTo(() => Quizz, { foreignKey: 'ql_id'})
    quizz!: Quizz

    @BelongsTo(() => Lesson, { foreignKey: 'lesson_id'})
    lessons!: Lesson
    
    @BelongsTo(() => lessonDetails, { foreignKey: 'lessonD_id'})
    lessonD!: lessonDetails
}