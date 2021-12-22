import { MigrationInterface, QueryRunner } from 'typeorm';

export class createModelTable1639684406423 implements MigrationInterface {
  name = 'createModelTable1639684406423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "models" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" text, "color" character varying NOT NULL DEFAULT '0xffffff', "width" double precision NOT NULL DEFAULT '0', "height" double precision NOT NULL DEFAULT '0', "depth" double precision NOT NULL DEFAULT '0', CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "models"`);
  }
}
