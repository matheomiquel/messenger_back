import { DataTypes, ModelDefined } from 'sequelize'
import { UserHasUserDB } from '../model'
import { sequelize } from './config'
const table = 'user_has_user'

const UserHasUserModel: ModelDefined<UserHasUserDB, undefined> = sequelize.define('UserHasUserModel',
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
        friend_id: {
            references: {
                key: 'id',
                model: {
                    tableName: 'user',
                }
            },
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM('SEND', 'ACCEPTED'),
            allowNull: false,
            defaultValue: 'SEND'
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
export { UserHasUserModel }