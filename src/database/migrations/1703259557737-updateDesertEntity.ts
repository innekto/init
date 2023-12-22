import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDesertEntity1703259557737 implements MigrationInterface {
    name = 'UpdateDesertEntity1703259557737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23"`);
        await queryRunner.query(`ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f"`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_33b553d9d134b80813bc1664890"`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_cab2e82567c9774b0803331ca36"`);
        await queryRunner.query(`ALTER TABLE "desert" RENAME COLUMN "number_of_tiers" TO "numberOfTiers"`);
        await queryRunner.query(`ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23" FOREIGN KEY ("desrtFillingId") REFERENCES "desrt_filling"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_33b553d9d134b80813bc1664890" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_cab2e82567c9774b0803331ca36" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_cab2e82567c9774b0803331ca36"`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_33b553d9d134b80813bc1664890"`);
        await queryRunner.query(`ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f"`);
        await queryRunner.query(`ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23"`);
        await queryRunner.query(`ALTER TABLE "desert" RENAME COLUMN "numberOfTiers" TO "number_of_tiers"`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_cab2e82567c9774b0803331ca36" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_33b553d9d134b80813bc1664890" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23" FOREIGN KEY ("desrtFillingId") REFERENCES "desrt_filling"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
