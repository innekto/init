import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1701179754034 implements MigrationInterface {
    name = 'AddUserRole1701179754034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
