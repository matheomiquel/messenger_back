import j2s from 'joi-to-swagger'
import * as Joi from 'joi'
const formattingBody = function ({ description, format = 'application/json', schema }:
    { description: string, format?: string, schema?: Joi.Schema }) {
    if (!schema)
        return { description: description }
    return {
        description: description,
        content: {
            [format]: {
                schema: {
                    ...j2s(schema).swagger
                }
            }
        }
    }
}

const formattingParameters = function ({ parameters }: { parameters: ParameterFormatingSwagger[] }) {
    return parameters.map((parameter) => {
        const swagger = { ...j2s(parameter.schema).swagger }
        const properties = swagger.properties
        const keys = Object.keys(properties)
        const values = Object.values(properties)
        const required = swagger.required
        const schema = keys.map((key, index) => {
            return {
                in: parameter.in,
                name: key,
                schema: values[index],
                required: required.includes(key) ? true : false
            }
        })
        return schema
    }).reduce((prev, cur) => prev.concat(cur))
}
type ParameterFormatingSwagger = {
    in: string,
    schema: Joi.Schema
}
export { formattingBody, formattingParameters }

