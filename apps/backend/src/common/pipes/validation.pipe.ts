import { type ArgumentMetadata, Injectable, type PipeTransform, type Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

const PRIMITIVE_TYPES: Type[] = [String, Boolean, Number, Array, Object];

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    const { metatype } = metadata;
    if (!metatype || PRIMITIVE_TYPES.includes(metatype)) {
      return value;
    }

    const obj = plainToInstance(metatype, value ?? {}) as object;
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        const constraints = err.constraints
          ? Object.values(err.constraints).join(', ')
          : 'invalid value';
        return `${err.property} - ${constraints}`;
      });
      throw new ValidationException(messages);
    }

    return obj;
  }
}
