import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnlineStatusToUser1700681975021 implements MigrationInterface {
    name = 'AddOnlineStatusToUser1700681975021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "online" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "online"`);
    }

}
