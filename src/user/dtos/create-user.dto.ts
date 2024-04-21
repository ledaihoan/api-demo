import * as Joi from 'joi';
import * as _ from 'lodash';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({ stripUnknown: true })
export class CreateUserDto {
  @JoiSchema(Joi.string().trim().required())
  firstName: string;

  @JoiSchema(Joi.string().trim().required())
  lastName: string;

  @JoiSchema(Joi.string().trim().required())
  email: string;

  @JoiSchema(Joi.string().trim().required())
  password: string;

  @JoiSchema(Joi.number().integer().default(0).min(0).strict())
  coin?: number;
}
