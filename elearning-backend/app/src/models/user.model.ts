import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, BelongsToMany, ForeignKey, HasOne } from 'sequelize-typescript';
import { Role, RoleUsers } from './role.model';
import { UsersCourses } from './userCourses';
import { Optional } from 'sequelize';
import { PasswordResetToken } from './passwordResetToken.model';
import { LessonDetailsCompletion } from './LessonsDetailsCompletion';
import { LessonCompletion } from './LessonCompletion';
import { reviews } from './review.model';

export interface UsersAttributes {
  id?: number
  username: string
  email: string
  password: string
  isVerificated: boolean
  verificationToken: string | null
}
export interface UsersAttributesPassport {
  id?: number
  username?: string
  email?: string
  password?: string
  isVerificated?: boolean
  verificationToken?: string | null
}
interface usercreationattributes extends Optional<UsersAttributes, 'username'> {}


@Table({ tableName: 'Users'})
export class Users extends Model<UsersAttributes, usercreationattributes> implements UsersAttributes {
    @PrimaryKey
    @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false
    })
    id!: number


    @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false
    })
    username!: string
    
    @Column({
      type: DataType.STRING,
      validate: {
        isEmail: true
      },
      unique: true,
      allowNull: false
    })
    email!: string

    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    password!: string

    @Column({
      type: DataType.BOOLEAN,
      allowNull: false
    })
    isVerificated!: boolean

    @Column({
      type: DataType.STRING,
    })
    verificationToken!: string | null
    
    @BelongsToMany(() => Role, () => RoleUsers)
    usersRole!: Role[];

    @HasMany(() => UsersCourses, { as: 'userCourses', foreignKey: 'userCourseId'})
    courseUserId!: UsersCourses[]

    @HasMany(() => reviews, { foreignKey: 'username_id'})
    reviews!: reviews

    // @HasOne(() => LessonDetailsCompletion, { foreignKey: 'id'})
    // lessonDetailsCompletion!: LessonDetailsCompletion

    // @HasOne(() => LessonCompletion, { foreignKey: 'id'})
    // lessonCompletion!: LessonCompletion
}
