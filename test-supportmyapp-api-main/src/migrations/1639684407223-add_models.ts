import { ModelEntity } from 'src/model/entity/model.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class addModels1639684407223 implements MigrationInterface {
  name = 'addModels1639684407223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const colors = ['0x950245', '0x930433', '0xbfff00', '0x0048ba', '0x89cff0'];
    const newModels: ModelEntity[] = colors.map((color, index) => {
      const newModel = new ModelEntity();

      newModel.color = color;
      newModel.title = `Object ${index + 1}`;
      newModel.width = 1;
      newModel.height = 1;
      newModel.depth = 1;

      return newModel;
    });

    await getRepository(ModelEntity).save(newModels);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "models"`);
  }
}
