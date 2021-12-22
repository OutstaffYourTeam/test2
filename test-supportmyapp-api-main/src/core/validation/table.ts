import { BadRequestException } from '@nestjs/common';
import { isEmpty, isNumber, isNumberString, min } from 'class-validator';

export const TableIdValidate = (id: number): number => {
  if (isEmpty(id)) {
    throw new BadRequestException(`id required`);
  }

  if (!isNumber(id) && !isNumberString(id) && !min(id, 1)) {
    throw new BadRequestException(`Invalid id`);
  }

  return id;
};
