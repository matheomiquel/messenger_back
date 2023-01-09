import { DataTypes, ModelDefined } from 'sequelize'
import { sequelize } from './config'
import { MessageDB } from '../model'
import { UserModel } from './user'
const table = 'message'

const MessageModel: ModelDefined<MessageDB, undefined> = sequelize.define('Message',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                key: 'id',
                model: {
                    tableName: 'user',
                }
                
            },
        },
        content: {
            type: new DataTypes.STRING(1000),
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
MessageModel.belongsTo(UserModel,
    {
        targetKey: 'id',
        as: 'message_user',
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
export { MessageModel }