import { Optional } from "sequelize"
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Lesson } from "./lesson.models"
import { QuizzQuestion } from "./QuizzQuestion.model"
import { QuizzLessonsCombined } from "./quizzLessonsCombined.model"

export interface quizzAttributtes {
    quizz_id?: number,
    quizz_name: string,
    quizz_description: string
    lesson_id?: number,
    quizzFakeId: number
}

interface quizzCreationAttributes extends Optional<quizzAttributtes, 'quizz_id'> {}


@Table({ tableName: 'Quizz'})
export class Quizz extends Model<quizzAttributtes, quizzCreationAttributes> implements quizzAttributtes {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quizz_id!: number 

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quizzFakeId!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    quizz_name!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    quizz_description!: string

    @ForeignKey(() => Lesson)
    lesson_id!: number
    
    @BelongsTo(() => Lesson, { foreignKey: 'lesson_id'})
    lesson!: Lesson 

    @HasMany(() => QuizzQuestion, { foreignKey: 'quizz_id'})
    quizzQues!: QuizzQuestion[]

    @HasMany(() => QuizzLessonsCombined, { foreignKey: 'quizz_id'})
    quizzLessComb!: QuizzLessonsCombined[]
}