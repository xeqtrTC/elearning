import { Table, Column, Model, HasMany, BelongsTo, ForeignKey ,PrimaryKey, DataType, BelongsToMany } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';

export interface instructorAttributes {
    usernameOfInstructor: string,
    instructorRole: string,
    descriptionOfInstructor: Text,
    biggerDescriptionOfInstructor: Text,
    githubLink: string,
    linkedInLink: string,
    twitterLink: string,
    youtubeLink: string
}

interface instructorCreationAttributes extends Optional<instructorAttributes, 'biggerDescriptionOfInstructor'> {}

@Table({ tableName: 'Instructors'})
export class instructors extends Model<instructorAttributes, instructorCreationAttributes> implements instructorAttributes {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    usernameOfInstructor!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    instructorRole!: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    descriptionOfInstructor!: Text

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    biggerDescriptionOfInstructor!: Text

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    githubLink!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    linkedInLink!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    twitterLink!: string
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    youtubeLink!: string

    // @ForeignKey(() => Course, () => InstructorsOnCourses)
    @BelongsToMany(() => Course, () => InstructorsOnCourses)
    courses!: Course[]
    // @BelongsToMany(() => Course, { 
    //     through: "instructors_of_course",
    //     foreignKey: "instructorId",
    //     otherKey: "courseId"
    // })
    // instructors!:
}

export interface instrcutoroncoursesAttributes {
    courseId: number,
    instructorId: number
}
interface instructoroncoursesCreationAttributes extends Optional<instrcutoroncoursesAttributes, 'courseId'> {}

@Table({ tableName: 'InstructorsOnCourses'})
export class InstructorsOnCourses extends Model<instrcutoroncoursesAttributes, instructoroncoursesCreationAttributes> implements instrcutoroncoursesAttributes{
    @ForeignKey(() => Course)
    @PrimaryKey
    @Column({
        field: 'course_id'
    })
    courseId!: number

    @ForeignKey(() => instructors)
    @PrimaryKey
    @Column({
        field: 'instructorId'
    })
    instructorId!: number
}
