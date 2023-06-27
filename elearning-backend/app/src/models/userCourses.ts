import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { Users } from './user.model';
import { Optional } from 'sequelize';

export interface UsersCourseAttributes {
    id?: number,
    courseUserId: number,
    userCourseId: number
}
interface usercourseCreationAttributes extends Optional<UsersCourseAttributes, 'id'> {}
@Table({ tableName: 'AddCourseToUser'})
export class UsersCourses extends Model<UsersCourseAttributes, usercourseCreationAttributes> implements UsersCourseAttributes {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true
    })
    id!: number

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    courseUserId!: number

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userCourseId!: number

    @BelongsTo(() => Course, { foreignKey: 'courseUserId'})
    courseId!: Course
    @BelongsTo(() => Users, { foreignKey: 'userCourseId'})
    userId!: Users
}

