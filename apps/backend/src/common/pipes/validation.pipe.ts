import { ArgumentMetadata, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

const PRIMITIVE_TYPES = [String, Boolean, Number, Array, Object];

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // Skip validation for primitives and when metatype is unknown
    if (!metadata.metatype || PRIMITIVE_TYPES.includes(metadata.metatype as any)) {
      return value;
    }

    const obj = plainToInstance(metadata.metatype, value ?? {});
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map(err => {
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
