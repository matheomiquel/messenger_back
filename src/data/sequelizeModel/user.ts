import { DataTypes, ModelDefined } from 'sequelize'
import { sequelize } from './config'
import { UserDB } from '../model'
const table = 'user'

const UserModel: ModelDefined<UserDB, undefined> = sequelize.define('User',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    tableName: table,
    underscored: true,
    freezeTableName: true
  }
)
UserModel.belongsToMany(UserModel,
  {
    through: 'user_has_user',
    as: 'friend',
    foreignKey: 'user_id',
  })
UserModel.belongsToMany(UserModel,
  {
    through: 'user_has_user',
    as: 'other_friend',
    foreignKey: 'friend_id',
  })
export { UserModel }