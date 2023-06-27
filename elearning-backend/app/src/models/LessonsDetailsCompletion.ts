import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { lessonDetails } from './lessonDetails.model';
import { Users } from './user.model';

export interface lessonsDetailsCompletionAttributes {
    id?: number
    lessonDetails_id: number,
    user_id: number,
    date_completion: Date
}

interface lessonCompletionDetailsCreationAttributes extends Optional<lessonsDetailsCompletionAttributes, 'id'> {}

@Table({ tableName: 'LessonDetailsCompletion'})
export class LessonDetailsCompletion extends Model<lessonsDetailsCompletionAttributes, lessonCompletionDetailsCreationAttributes> implements lessonsDetailsCompletionAttributes {
    
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false
    })
    id!: number

    @ForeignKey(() => lessonDetails)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    lessonDetails_id!: number;

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

    @BelongsTo(() => lessonDetails, { foreignKey: 'lessonDetails_id'})
    lessonDetailsCompletion!: lessonDetails

    @BelongsTo(() => Users, { foreignKey: 'user_id'})
    userIdCompletion!: Users
}