import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultTakeCount } from 'src/core/constants/basic';
import { PaginationDto } from 'src/core/dto/table-pagination.dto';
import { Repository } from 'typeorm';
import { ModelEntity } from './entity/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ModelEntity)
    private readonly modelRepository: Repository<ModelEntity>,
  ) {}

  async getModels(filterOpt: PaginationDto): Promise<[ModelEntity[], number]> {
    return this.modelRepository.findAndCount({
      where: {},
      order: { updatedAt: 'DESC' },
      take: filterOpt.take || defaultTakeCount,
      skip: filterOpt.skip || 0,
    });
  }

  async getModelById(id: number): Promise<ModelEntity> {
    return this.modelRepository.findOne(id);
  }

  async saveModel(data: ModelEntity): Promise<ModelEntity> {
    return this.modelRepository.save(data);
  }

  async deleteModelById(id): Promise<boolean> {
    return this.modelRepository.softDelete(id).then(() => true);
  }
}
