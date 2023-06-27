import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, BelongsToMany, ForeignKey, HasOne } from 'sequelize-typescript';
import { BadgeForUsers } from './badgesForUsers.model';
import { BadgeCriteria } from './badgeCritieria.model';

export interface BadgeAttributes {
    badge_id?: number
    badgeName?: string,
    badgeImage: string,
    badgeCriteriaId: number
}

interface BadgesCreationAttributes extends Optional<BadgeAttributes, 'badge_id'> {}

@Table({ tableName: 'Badges'})
export class Badges extends Model<BadgeAttributes, BadgesCreationAttributes> implements BadgeAttributes {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false
    })
    badge_id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    badgeName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    badgeImage!: string;

    @ForeignKey(() => BadgeCriteria)
    @Column
    badgeCriteriaId!: number;

    @HasMany(() => BadgeForUsers, { foreignKey: 'badge_id'})
    badgesForCompletion!: BadgeForUsers

    @BelongsTo(() => BadgeCriteria)
    badgeCriteria!: BadgeCriteria
}