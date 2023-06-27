import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';
import { Users } from './user.model';

export interface reviewAttributes {
    review_id?: number,
    username_id: number,
    descriptionOfReview: Text,
    reviewCourseId: number
}
interface reviewCreationAttributes extends Optional<reviewAttributes, 'review_id'> {}

@Table({ tableName: 'Reviews'})
export class reviews extends Model<reviewAttributes, reviewCreationAttributes> implements reviewAttributes {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    review_id!: number

    @ForeignKey(() => Users)
    @Column
    username_id!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    descriptionOfReview!: Text

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    reviewCourseId!: number;

    @BelongsTo(() => Users, { foreignKey: 'username_id'})
    reviewUser!: Users
    
    @BelongsTo(() => Course, { foreignKey: 'reviewCourseId'})
    reviewCourse!: Course
}
// module.exports = (sequelize, Sequelize) => {
//     const Review = sequelize.define('reviews', {
//         usernameOfReview: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         descriptionOfReview: {
//             type: Sequelize.TEXT,
//             allowNull: false
//         }
//     })
//     Review.associate = (models) => {
//         Review.belongsTo(models.course)
//     }
//     return Review
// }