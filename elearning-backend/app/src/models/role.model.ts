import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Users } from './user.model';
import { Optional } from 'sequelize';

export interface RoleUsersAttributes {
    roleUsersId?: number,
    userId: number,
    roleId: number
}
export interface roleAttributes {
    id?: number,
    name: string
}
interface roleuserscreationattributes extends Optional<RoleUsersAttributes, 'roleUsersId'> {}
interface rolecreationattributes extends Optional<roleAttributes, 'id'> {}


@Table({ tableName: 'Roles'})
export class Role extends Model<roleAttributes, rolecreationattributes> implements roleAttributes {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true
    })
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @BelongsToMany(() => Users, () => RoleUsers)
    roles!: Users[] 
}

@Table({ tableName: 'RoleOfUsers'})
export class RoleUsers extends Model<RoleUsersAttributes, roleuserscreationattributes> implements RoleUsersAttributes {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true
    })
    roleUsersId!: number

    @ForeignKey(() => Users)
    @Column({
        field: 'user_id'
    })
    userId!: number

    @ForeignKey(() => Role)
    @Column({
        field: 'role_id'
    })
    roleId!: number

    @BelongsTo(() => Role)
    role!: Role;

    @BelongsTo(() => Users)
    user!: Users;
}
// module.exports = (sequelize, Sequelize) => {
//     const Role = sequelize.define('roles', {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         name: {
//             type: Sequelize.STRING
//         },
//     });
//     Role.associate = (models) => {
//         Role.belongsToMany(models.users, {
//             through: "user_roles",
//             foreignKey: "roleId",
//             otherKey: "userId",
//         })
//     };
//     return Role;
// }