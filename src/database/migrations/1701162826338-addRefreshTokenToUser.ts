import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenToUser1701162826338 implements MigrationInterface {
  name = 'AddRefreshTokenToUser1701162826338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }
}
