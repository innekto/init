import { MigrationInterface, QueryRunner } from "typeorm";

export class EditDesertfillings1701340525520 implements MigrationInterface {
    name = 'EditDesertfillings1701340525520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desrt_filling" ADD "imagePath" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desrt_filling" DROP COLUMN "imagePath"`);
    }

}
