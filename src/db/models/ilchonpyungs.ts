import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ilchonpyungs extends BaseEntity {
  @PrimaryGeneratedColumn()
  ilchonpyungId: number;

  @Column()
  userId: number;

  @Column()
  myhomeId: number;

  @Column()
  nick: string;

  @Column()
  name: string;

  @Column()
  ilchonpyung: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// import {
//   Model,
//   DataTypes,
//   InferAttributes,
//   CreationOptional,
//   InferCreationAttributes,
// } from 'sequelize';
// import sequelize from '../config/connection';
// import { Users, Myhomes } from '.';

// class Ilchonpyungs extends Model<
//   InferAttributes<Ilchonpyungs>,
//   InferCreationAttributes<Ilchonpyungs>
// > {
//   declare ilchonpyungId: CreationOptional<number>;
//   declare userId: number;
//   declare myhomeId: number;
//   declare nick: string;
//   declare name: string;
//   declare ilchonpyung: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;

//   static associate() {
//     this.belongsTo(Users, { foreignKey: 'userId' });
//     this.belongsTo(Myhomes, { foreignKey: 'myhomeId' });
//   }
// }

// Ilchonpyungs.init(
//   {
//     ilchonpyungId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false, // NOT NULL, Null을 허용하지 않음
//       autoIncrement: true, // AUTO_INCREMENT
//       primaryKey: true, // PRIMARY KEY, 기본키
//       unique: true,
//     },
//     myhomeId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       references: {
//         model: 'Myhomes',
//         key: 'myhomeId',
//       },
//       onDelete: 'cascade',
//     },
//     userId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       references: {
//         model: 'Users',
//         key: 'userId',
//       },
//       onDelete: 'cascade',
//     },
//     nick: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     ilchonpyung: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     modelName: 'Ilchonpyungs',
//   }
// );

// export default Ilchonpyungs;
