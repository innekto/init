import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDesertTypesEntity1700743069541
  implements MigrationInterface
{
  name = 'CreateDesertTypesEntity1700743069541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."desert_types_type_enum" AS ENUM('macaroon', 'tarts', 'cakes', 'bento_cakes')`,
    );
    await queryRunner.query(
      `CREATE TABLE "desert_types" ("id" SERIAL NOT NULL, "type" "public"."desert_types_type_enum", CONSTRAINT "PK_4c23911007eb3d0b21cfc2f6876" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "desert_types"`);
    await queryRunner.query(`DROP TYPE "public"."desert_types_type_enum"`);
  }
}
