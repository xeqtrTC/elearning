import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';

export interface categoryAttributes {
    id?: number
    nameOfCategory: string
}
interface categoryCreationAttributes extends Optional<categoryAttributes, 'nameOfCategory'> {}

@Table({ tableName: 'categories'})
export class Category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nameOfCategory!: string

    @ForeignKey(() => Course)
    @HasMany(() => Course, { as: 'courses'})
    courseId!: Course[]
}

// module.exports = (sequelize, Sequelize) => {
//     const category = sequelize.define('categories', {
//         nameOfCategory: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         }
//     })
//     category.associate = (models) => {
//         category.hasMany(models.course, { as: 'courses'})
//     }
//     return category
// }