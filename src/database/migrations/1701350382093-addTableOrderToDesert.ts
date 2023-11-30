import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableOrderToDesert1701350382093 implements MigrationInterface {
    name = 'AddTableOrderToDesert1701350382093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_to_desert" ("desertId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_582623f859a7d3038ac1fbf47b5" PRIMARY KEY ("desertId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_33b553d9d134b80813bc166489" ON "order_to_desert" ("desertId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cab2e82567c9774b0803331ca3" ON "order_to_desert" ("orderId") `);
        await queryRunner.query(`ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_33b553d9d134b80813bc1664890" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_cab2e82567c9774b0803331ca36" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_cab2e82567c9774b0803331ca36"`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_33b553d9d134b80813bc1664890"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cab2e82567c9774b0803331ca3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_33b553d9d134b80813bc166489"`);
        await queryRunner.query(`DROP TABLE "order_to_desert"`);
    }

}
