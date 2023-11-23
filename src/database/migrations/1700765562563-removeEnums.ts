import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveEnums1700765562563 implements MigrationInterface {
    name = 'RemoveEnums1700765562563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desert" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."desert_type_enum"`);
        await queryRunner.query(`ALTER TABLE "desert" ADD "type" character varying`);
        await queryRunner.query(`ALTER TABLE "desert_types" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."desert_types_type_enum"`);
        await queryRunner.query(`ALTER TABLE "desert_types" ADD "type" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desert_types" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."desert_types_type_enum" AS ENUM('macaroon', 'tarts', 'cakes', 'bento')`);
        await queryRunner.query(`ALTER TABLE "desert_types" ADD "type" "public"."desert_types_type_enum"`);
        await queryRunner.query(`ALTER TABLE "desert" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."desert_type_enum" AS ENUM('macaroon', 'tarts', 'cakes', 'bento')`);
        await queryRunner.query(`ALTER TABLE "desert" ADD "type" "public"."desert_type_enum"`);
    }

}
