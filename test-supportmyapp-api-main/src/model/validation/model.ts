import { BadRequestException } from '@nestjs/common';
import {
  isEmpty,
  isHexColor,
  isNotEmptyObject,
  isNumber,
} from 'class-validator';
import { ModelDto } from '../dto/model.dto';

export class ModelValidation {
  validateModelDto(data: ModelDto): ModelDto {
    if (isEmpty(data) || !isNotEmptyObject(data)) {
      throw new BadRequestException('object details required');
    }
    if (isEmpty(data.color)) {
      throw new BadRequestException(`color required`);
    }

    if (!isHexColor(data.color)) {
      throw new BadRequestException('Invalid color');
    }

    if (isEmpty(data.width)) {
      throw new BadRequestException(`width required`);
    }

    if (!isNumber(data.width)) {
      throw new BadRequestException(`Invalid width`);
    }

    if (isEmpty(data.height)) {
      throw new BadRequestException(`height required`);
    }

    if (!isNumber(data.height)) {
      throw new BadRequestException(`Invalid height`);
    }

    if (isEmpty(data.depth)) {
      throw new BadRequestException(`depth required`);
    }

    if (!isNumber(data.depth)) {
      throw new BadRequestException(`Invalid depth`);
    }

    return data;
  }
}
