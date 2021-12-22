import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entity/model.entity';
import { ModelValidation } from './validation/model';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity])],
  providers: [ModelService, ModelValidation],
  controllers: [ModelController],
})
export class ModelModule {}
