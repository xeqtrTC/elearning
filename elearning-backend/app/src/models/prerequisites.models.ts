import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';

export interface prerequisitesAttributes {
    nameOfPrerequisites: string,
    courseId: number
}
interface prerequisitesCreationAttributes extends Optional<prerequisitesAttributes, 'nameOfPrerequisites'> {}

@Table({ tableName: 'Prerequisites' })
export class prerequisites extends Model<prerequisitesAttributes, prerequisitesCreationAttributes> implements prerequisitesAttributes {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nameOfPrerequisites!: string 
    
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    courseId!: number;
    
    @BelongsTo(() => Course, { foreignKey: 'courseId'})
    course!: Course
}
// module.exports = (sequelize, Sequelize) => {
//     const Prerequisites = sequelize.define('prerequisites', {
//         nameOfPrerequisites: {
//             type: Sequelize.STRING,
//             allowNull: false
//         }
//     })
//     Prerequisites.associate = (models) => {
//         Prerequisites.belongsTo(models.course)
//     }
//     return Prerequisites
// }