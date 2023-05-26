import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType } from 'sequelize-typescript';

export interface emailSubAttributes {
    emailOfSub: string,
    uniqueID: string
}

interface emailCreationAttributes extends Optional<emailSubAttributes, 'emailOfSub'> {}


@Table({ tableName: 'emailSubscription'})
export class EmailSubscription extends Model<emailSubAttributes, emailCreationAttributes> implements emailSubAttributes {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    emailOfSub!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    uniqueID!: string
}

