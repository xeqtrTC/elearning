import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';

export interface courseIncludesAttributes {
    nameOfInclude: string,
    courseIncludeID: number
}
interface courseIncludesCreationAttributes extends Optional<courseIncludesAttributes, 'nameOfInclude'> {}

@Table({ tableName: 'CourseIncludes'})
export class CourseIncludes extends Model<courseIncludesAttributes, courseIncludesCreationAttributes> implements courseIncludesAttributes {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nameOfInclude!: string
    
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    courseIncludeID!: number
    
    @BelongsTo(() => Course, { foreignKey: 'courseIncludeID'})
    courseId!: Course
}
