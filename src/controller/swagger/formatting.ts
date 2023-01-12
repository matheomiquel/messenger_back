import * as Joi from "joi";
import j2s from "joi-to-swagger";

import { ParameterFormatingSwaggerType } from "./ParameterFormatingSwaggerType";

const formattingBody = function formattingBodyForSwagger({ description, format = "application/json", schema }:
  { description: string, format?: string, schema?: Joi.Schema }) {
  if (!schema) return { description: description };
  return {
    description: description,
    content: {
      [format]: {
        schema: {
          ...j2s(schema).swagger
        }
      }
    }
  };
};

const formattingParameters = function formattingParametersForSwagger(
  { parameters }: {
    parameters: ParameterFormatingSwaggerType[]
  }
) {
  return parameters.map((parameter) => {
    const swagger = { ...j2s(parameter.schema).swagger };
    const properties = swagger.properties;
    const keys = Object.keys(properties);
    const values = Object.values(properties);
    const required = swagger.required;
    const schema = keys.map((key, index) => {
      return {
        in: parameter.in,
        name: key,
        schema: values[index],
        required: !!required.includes(key)
      };
    });
    return schema;
  }).reduce((prev, cur) => prev.concat(cur));
};

export { formattingBody, formattingParameters };
