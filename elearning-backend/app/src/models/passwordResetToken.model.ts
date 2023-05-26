import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Users } from './user.model';
import { Optional } from 'sequelize';

export interface passwordResetTokenAttributes {
  email: string,
  token: string
  expiresAt: Date
}
interface passwordResetCreationAttributes extends Optional<passwordResetTokenAttributes, 'email'> {}

@Table({ tableName: 'PasswordResetToken'})
export class PasswordResetToken extends Model<passwordResetTokenAttributes, passwordResetCreationAttributes> implements passwordResetTokenAttributes {
    @Column({
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    })
    email!: string

    @Column({
      type: DataType.STRING,
      allowNull: false,
      // defaultValue: DataType.UUIDV4
    })
    token!: string;

    @Column({
      type: DataType.DATE,
      allowNull: false
    })
    expiresAt!: Date

    // @ForeignKey(() => Users)
    // @HasMany(() => Users, { foreignKey: 'resetId'})
    // userToken!: Users[]

}

// module.exports = (sequelize, Sequelize) => {
//     const PasswordResetToken = sequelize.define('passwordResetToken', {
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         validate: {
//             isEmail: true
//         }
//       },
//       token: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         defaultValue: Sequelize.UUIDV4
//       },
//       expiresAt: {
//         type: Sequelize.DATE,
//         allowNull: false
//       }
//     });

//     PasswordResetToken.associate = (models) => {
//         PasswordResetToken.belongsTo(models.users)
//     }
//     return PasswordResetToken
//   };