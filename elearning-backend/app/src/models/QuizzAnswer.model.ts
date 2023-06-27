import { Optional } from "sequelize"
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { QuizzQuestion } from "./QuizzQuestion.model"

export interface quizzAnswerAttributtes {
    quizz_answer_id?: number
    quizz_question_id: number,
    quizz_answer_text: string,
    quizz_isAnswerCorrect: boolean
}

interface quizzAnswerCreationAttributes extends Optional<quizzAnswerAttributtes, 'quizz_answer_id'> {}

@Table({ tableName: 'QuizzAnswer'})
export class QuizzAnswer extends Model<quizzAnswerAttributtes, quizzAnswerCreationAttributes> implements quizzAnswerAttributtes {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quizz_answer_id!: number 

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    quizz_answer_text!: string

    @ForeignKey(() => QuizzQuestion)
    @Column
    quizz_question_id!: number

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    quizz_isAnswerCorrect!: boolean

    @BelongsTo(() => QuizzQuestion, { foreignKey: 'quizz_question_id'})
    quizzQuestion!: QuizzQuestion
}