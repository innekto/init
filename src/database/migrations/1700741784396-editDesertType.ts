import { MigrationInterface, QueryRunner } from "typeorm";

export class EditDesertType1700741784396 implements MigrationInterface {
    name = 'EditDesertType1700741784396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desert" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."desert_type_enum" AS ENUM('macaroon', 'tarts', 'cakes', 'bento_cakes')`);
        await queryRunner.query(`ALTER TABLE "desert" ADD "type" "public"."desert_type_enum"`);
        await queryRunner.query(`ALTER TABLE "desert" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "desert" ADD "price" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desert" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "desert" ADD "price" character varying`);
        await queryRunner.query(`ALTER TABLE "desert" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."desert_type_enum"`);
        await queryRunner.query(`ALTER TABLE "desert" ADD "type" character varying`);
    }

}
