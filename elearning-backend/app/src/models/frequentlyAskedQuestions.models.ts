import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { AnswerOnQuestion } from './answerOnQuestions.models';
import { Optional } from 'sequelize';

export interface freqAskedQuestionsAttributes {
    nameOfQuestion: string,
    courseFreqID: number
}
interface freqCreationAttributes extends Optional<freqAskedQuestionsAttributes, 'courseFreqID'> {}

@Table({ tableName: 'FrequentlyAskedQuestions' })
export class frequentlyAskedQuestions extends Model<freqAskedQuestionsAttributes, freqCreationAttributes> implements freqAskedQuestionsAttributes {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nameOfQuestion!: string

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    courseFreqID!: number

    @BelongsTo(() => Course, { foreignKey: 'courseFreqID'})
    courseId!: Course

    @HasMany(() => AnswerOnQuestion, { foreignKey: 'freqQuestionId', as: 'freqQuestion' })
    questionId!: AnswerOnQuestion
}
