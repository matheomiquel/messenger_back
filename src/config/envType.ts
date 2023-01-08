import {Options } from 'sequelize'
import { EnvironmentName } from './envName'
export type env = {
    [key in EnvironmentName]: Options
}