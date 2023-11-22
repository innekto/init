import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserEntity1700670950714 implements MigrationInterface {
  name = 'FixUserEntity1700670950714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" character varying DEFAULT 'notActive'`,
    );
  }
}
