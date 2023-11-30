import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDesrtfilling1701340441069 implements MigrationInterface {
    name = 'CreateDesrtfilling1701340441069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "desrt_filling" ("id" SERIAL NOT NULL, "name" character varying, CONSTRAINT "PK_245ad669c839e7dd27edb1928e7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "desrt_filling"`);
    }

}
