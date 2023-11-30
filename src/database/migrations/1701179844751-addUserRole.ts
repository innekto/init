import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1701179844751 implements MigrationInterface {
    name = 'AddUserRole1701179844751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
    }

}
