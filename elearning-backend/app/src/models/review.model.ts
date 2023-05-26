import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';

export interface reviewAttributes {
    usernameOfReview: string,
    descriptionOfReview: Text,
    reviewCourseId: number
}
interface reviewCreationAttributes extends Optional<reviewAttributes, 'usernameOfReview'> {}

@Table({ tableName: 'Reviews'})
export class reviews extends Model<reviewAttributes, reviewCreationAttributes> implements reviewAttributes {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    usernameOfReview!: string;

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