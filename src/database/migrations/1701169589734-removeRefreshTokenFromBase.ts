import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRefreshTokenFromBase1701169589734
  implements MigrationInterface
{
  name = 'RemoveRefreshTokenFromBase1701169589734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
  }
}
