import { DataTypes, ModelDefined } from 'sequelize'
import { UserHasConversationDB } from '../model/user'
import { sequelize } from './config'
import {  USER_HAS_CONVERSATION } from './tableName'
const table = USER_HAS_CONVERSATION

const UserHasConverstionModel: ModelDefined<UserHasConversationDB, undefined> = sequelize.define('UserHasConverstion',
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                key: 'id',
                model: {
                    tableName: 'user',
                }
            }
        },
        conversation_id: {
            references: {
                key: 'id',
                model: {
                    tableName: 'conversation',
                }
            },
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: table,
        underscored: true,
        freezeTableName: true
    }
)

export { UserHasConverstionModel }