import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as OrmConfig from './orm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelModule } from './model/model.module';

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig), ModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
