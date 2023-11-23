import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditTypeBento1700745346937 implements MigrationInterface {
  name = 'EditTypeBento1700745346937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."desert_types_type_enum" RENAME TO "desert_types_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."desert_types_type_enum" AS ENUM('macaroon', 'tarts', 'cakes', 'bento')`,
    );
    await queryRunner.query(
      `ALTER TABLE "desert_types" ALTER COLUMN "type" TYPE "public"."desert_types_type_enum" USING "type"::"text"::"public"."desert_types_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."desert_types_type_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."desert_type_enum" RENAME TO "desert_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."desert_type_enum" AS ENUM('macaroon', 'tarts', 'cakes', 'bento')`,
    );
    await queryRunner.query(
      `ALTER TABLE "desert" ALTER COLUMN "type" TYPE "public"."desert_type_enum" USING "type"::"text"::"public"."desert_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."desert_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."desert_type_enum_old" AS ENUM('macaroon', 'tarts', 'cakes', 'bento_cakes')`,
    );
    await queryRunner.query(
      `ALTER TABLE "desert" ALTER COLUMN "type" TYPE "public"."desert_type_enum_old" USING "type"::"text"::"public"."desert_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."desert_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."desert_type_enum_old" RENAME TO "desert_type_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."desert_types_type_enum_old" AS ENUM('macaroon', 'tarts', 'cakes', 'bento_cakes')`,
    );
    await queryRunner.query(
      `ALTER TABLE "desert_types" ALTER COLUMN "type" TYPE "public"."desert_types_type_enum_old" USING "type"::"text"::"public"."desert_types_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."desert_types_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."desert_types_type_enum_old" RENAME TO "desert_types_type_enum"`,
    );
  }
}
