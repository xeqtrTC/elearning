import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType } from 'sequelize-typescript';
import { liveRoomMessages } from './liveRoomMessages.model';
import { Optional } from 'sequelize';

export interface liveRoomsAttributes {
    idOfRoom: string,
    socketId: string
}
interface liveRoomMessageCreationAttributes extends Optional<liveRoomsAttributes, 'idOfRoom'> {}
@Table({ tableName: 'LiveRooms'})
export class LiveRooms extends Model<liveRoomsAttributes, liveRoomMessageCreationAttributes> implements liveRoomsAttributes {
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
    idOfRoom!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    socketId!: string

    // @HasMany(() => liveRoomMessages, { foreignKey: 'aLiveRoomId'} )
    // liveMessagesTest!: liveRoomMessages[]
}
