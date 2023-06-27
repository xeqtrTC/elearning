import { Optional } from "sequelize";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Quizz } from "./Quizz.model";
import { QuizzAnswer } from "./QuizzAnswer.model";

export interface quizzQuestionAttributtes {
    quizzQuestion_id?: number,
    quizz_id: number,
    quizz_text: string
}

interface quizzCreationAttributtes extends Optional<quizzQuestionAttributtes, 'quizzQuestion_id'> {}

@Table({ tableName: 'QuizzQuestion'})
export class QuizzQuestion extends Model<quizzQuestionAttributtes, quizzCreationAttributtes> implements quizzQuestionAttributtes {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quizzQuestion_id!: number

    @ForeignKey(() => Quizz)
    @Column
    quizz_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    quizz_text!: string;

    @BelongsTo(() => Quizz, { foreignKey: 'quizz_id'})
    quizz!: Quizz

    @HasMany(() => QuizzAnswer, { foreignKey: 'quizz_question_id'})
    quizzAnswers!: QuizzAnswer[]
}