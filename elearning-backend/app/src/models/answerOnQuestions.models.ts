import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { frequentlyAskedQuestions } from './frequentlyAskedQuestions.models';
import { Col } from 'sequelize/types/utils';
import { Optional } from 'sequelize';

export interface answerAttributes {
    answerOnQuestion: string
    freqQuestionId: number
}
interface answerCreationAttributes extends Optional<answerAttributes, 'freqQuestionId'> {}

@Table({ tableName: 'answersOnQuestion'})
export class AnswerOnQuestion extends Model<AnswerOnQuestion,answerCreationAttributes> implements AnswerOnQuestion {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    answerOnQuestion!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    freqQuestionId!: number
    
    @ForeignKey(() => frequentlyAskedQuestions)
    @BelongsTo(() => frequentlyAskedQuestions, { foreignKey: 'freqQuestionId'})
    frequentlyAskedQuestions!: frequentlyAskedQuestions

    // @BelongsTo(() => frequentlyAskedQuestions)
    // frequentlyAskedQuestions?: frequentlyAskedQuestions[];
}
