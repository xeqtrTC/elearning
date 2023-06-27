import { Column, Model, DataType, ForeignKey, BelongsTo, Table, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Badges } from './badges.model';
import { Optional } from 'sequelize';
import { Course } from './course.model';
import { RequirementBadgesType } from './requirementType.model';

interface badgeCriteriaAttributtes {
    id?: number,
    requirementType_id: number,
}

interface badgeCriteriaCreationAttributes extends Optional<badgeCriteriaAttributtes, 'id'> {}

@Table({ tableName: 'BadgeCriteria'})
export class BadgeCriteria extends Model<badgeCriteriaAttributtes,badgeCriteriaCreationAttributes> implements badgeCriteriaAttributtes {
    @PrimaryKey
    @AutoIncrement
    @Column({
        allowNull: false
    })  
    id!: number

    @ForeignKey(() => RequirementBadgesType)
    @Column
    requirementType_id!: number;

    @HasMany(() => Badges)
    badges!: Badges[]

    @BelongsTo(() => RequirementBadgesType, { foreignKey: 'requirementType_id'})
    requirmentBadge!: RequirementBadgesType
}