import { Table, Column, Model, HasMany, BelongsTo, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './course.model';
import { Optional } from 'sequelize';

export interface WHBAttributes {
  wub_id?: number,
  wub_imageLink?: string | undefined,
  wub_title: string,
  wub_description: Text,
  courseWhbID: number
}
interface WHBCreationAttributes extends Optional<WHBAttributes, 'courseWhbID'> {}


@Table({ tableName: 'Whatyoubuild'})
export class whatyoubuild extends Model<WHBAttributes, WHBCreationAttributes> implements WHBAttributes {
    @PrimaryKey
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true
    })
    wub_id!: number

    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    wub_imageLink!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    wub_title!: string

    @Column({
      type: DataType.TEXT,
      allowNull: false
    })
    wub_description!: Text

    @ForeignKey(() => Course)
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    courseWhbID!: number;

    @BelongsTo(() => Course, { foreignKey: 'courseWhbID'})
    courseWHB!: Course
}


// module.exports =  (sequelize, Sequelize) => {
//     const Whatyoubuild = sequelize.define("whatyoubuild", {
//       wub_id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       wub_imageLink: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       wub_title: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       wub_description: {
//         type: Sequelize.TEXT,
//         allowNull: false
//       },
//     });
//     Whatyoubuild.associate = (models) => {
//         Whatyoubuild.belongsTo(models.course)
//     };
//     return Whatyoubuild
//   };