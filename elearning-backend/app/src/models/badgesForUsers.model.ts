import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Users } from './user.model';
import { Badges } from './badges.model';

export interface badgesForUsersAttributes {
    id?: number
    badge_id?: number,
    user_id: number,
    date_completion: Date
}

interface badgeForUsersCreationAttributes extends Optional<badgesForUsersAttributes, 'id'> {}

@Table({ tableName: 'BadgeForUsers'})
export class BadgeForUsers extends Model<badgesForUsersAttributes, badgeForUsersCreationAttributes> implements badgesForUsersAttributes {
    
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false
    })
    id!: number

    @ForeignKey(() => Badges)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    badge_id!: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    date_completion!: Date;

    @BelongsTo(() => Badges, { foreignKey: 'badge_id'})
    badges!: Badges

    @BelongsTo(() => Users, { foreignKey: 'user_id'})
    userBadge!: Users
}