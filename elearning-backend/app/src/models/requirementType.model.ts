import { Optional } from "sequelize";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { BadgeCriteria } from "./badgeCritieria.model";

interface requirementTypeAttributes {
    id?: number,
    requirement: string,
}

interface requirementTypeCreationAttributes extends Optional<requirementTypeAttributes, 'id'> {}

@Table({ tableName: 'RequirementType'})
export class RequirementBadgesType extends Model<requirementTypeAttributes, requirementTypeCreationAttributes> implements requirementTypeAttributes {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: number
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    requirement!: string;

    @HasMany(() => BadgeCriteria, { foreignKey: 'requirementType_id'})
    badgeCriteria!: BadgeCriteria[]
}