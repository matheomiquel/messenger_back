import { Sequelize } from 'sequelize'
import { config, EnvironmentName } from '../../config'
const env = process.env.NODE_ENV as EnvironmentName ??  'development' 
const configuration = config[env] 
const sequelize = new Sequelize(configuration)
export { sequelize }