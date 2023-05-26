import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { LiveRooms } from './liveRooms.model';
import { Optional } from 'sequelize';

export interface liveRoomsMessageAttributes {
    name: string,
    message: string,
    idOfRoom?: string
}
interface liveRoomCreationAttributes extends Optional<liveRoomsMessageAttributes, 'name'> {}

@Table({ tableName: 'LiveMessages'})
export class liveRoomMessages extends Model<liveRoomsMessageAttributes, liveRoomCreationAttributes> implements liveRoomCreationAttributes {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true
    })
    id!: number
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    message!: string;

    // @ForeignKey(() => LiveRooms)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    idOfRoom!: string
    
    // @BelongsTo(() => LiveRooms, { foreignKey: 'aLiveRoom'})
    // live!: LiveRooms
}
// module.exports = (sequelize, Sequelize) => {
//     const liveRoomMessages = sequelize.define('liveMessages', {
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         message: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         idOfRoom: {
//             type: Sequelize.STRING,
//             allowNull: false
//         }
//     })
//     liveRoomMessages.associate = (models) => {
//         liveRoomMessages.belongsTo(models.liveRooms, { foreignKey: 'liveRoomId' });
//     }
//     return liveRoomMessages
// }