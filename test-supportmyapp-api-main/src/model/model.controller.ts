import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginatorDto } from 'src/core/dto/paginator.dto';
import { SuccessResponse } from 'src/core/dto/success-response.dto';
import { PaginationDto } from 'src/core/dto/table-pagination.dto';
import { getFromDto } from 'src/core/utils/repository';
import { TableIdValidate } from 'src/core/validation/table';
import { ModelDto } from './dto/model.dto';
import { ModelEntity } from './entity/model.entity';
import { ModelService } from './model.service';
import { ModelValidation } from './validation/model';

@ApiTags('3D Objects')
@Controller('model')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private readonly modelValidation: ModelValidation,
  ) {}

  @Get()
  @ApiOkResponse({ type: [ModelEntity] })
  async getModels(
    @Query() filterOpt: PaginationDto,
  ): Promise<PaginatorDto<ModelEntity>> {
    return this.modelService
      .getModels(filterOpt)
      .then(([data, count]) => ({ data, count }))
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to get models. ${err.message}`,
        );
      });
  }

  @Post()
  @ApiOkResponse({ type: ModelEntity })
  async addModel(@Body() data: ModelDto): Promise<ModelEntity> {
    const modelData = this.modelValidation.validateModelDto(data);
    const newModel = getFromDto<ModelEntity>(modelData, new ModelEntity());

    return this.modelService.saveModel(newModel).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to add new model. ${err.message}`,
      );
    });
  }

  @Get('/:id')
  @ApiParam({ type: Number, required: true, name: 'id', example: 1 })
  @ApiOkResponse({ type: ModelEntity })
  async getModelById(@Param('id') id: number): Promise<ModelEntity> {
    const modelId = TableIdValidate(id);

    const model = await this.modelService.getModelById(modelId);
    if (!model) {
      throw new NotFoundException(`Model not found`);
    }

    return model;
  }

  @Put('/:id')
  @ApiParam({ type: Number, required: true, name: 'id', example: 1 })
  @ApiOkResponse({ type: ModelEntity })
  async updateModelById(
    @Param('id') id: number,
    @Body() data: ModelDto,
  ): Promise<ModelEntity> {
    const modelId = TableIdValidate(id);
    const newData = this.modelValidation.validateModelDto(data);

    const oldModel = await this.getModelById(modelId);
    const newModel = getFromDto<ModelEntity>(newData, oldModel);

    return this.modelService.saveModel(newModel).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to update model. ${err.message}`,
      );
    });
  }

  @Delete('/:id')
  @ApiParam({ type: Number, required: true, name: 'id', example: 1 })
  @ApiOkResponse({ type: SuccessResponse })
  async deleteById(@Param('id') id: number): Promise<SuccessResponse> {
    const modelId = TableIdValidate(id);

    const model = await this.getModelById(modelId);
    return this.modelService
      .deleteModelById(model.id)
      .then(() => new SuccessResponse(true));
  }
}
