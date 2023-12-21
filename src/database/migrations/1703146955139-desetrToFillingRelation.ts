import { MigrationInterface, QueryRunner } from 'typeorm';

export class DesetrToFillingRelation1703146955139
  implements MigrationInterface
{
  name = 'DesetrToFillingRelation1703146955139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_33b553d9d134b80813bc1664890"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_cab2e82567c9774b0803331ca36"`,
    );
    await queryRunner.query(
      `CREATE TABLE "filling_to_desert" ("desrtFillingId" integer NOT NULL, "desertId" integer NOT NULL, CONSTRAINT "PK_8f3414bc62a349658673b004fc8" PRIMARY KEY ("desrtFillingId", "desertId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51240904a5b253c9a2a96fe2a2" ON "filling_to_desert" ("desrtFillingId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f3b191bf1bf5a0031191d431c6" ON "filling_to_desert" ("desertId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23" FOREIGN KEY ("desrtFillingId") REFERENCES "desrt_filling"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_33b553d9d134b80813bc1664890" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_cab2e82567c9774b0803331ca36" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_cab2e82567c9774b0803331ca36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_33b553d9d134b80813bc1664890"`,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f3b191bf1bf5a0031191d431c6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51240904a5b253c9a2a96fe2a2"`,
    );
    await queryRunner.query(`DROP TABLE "filling_to_desert"`);
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_cab2e82567c9774b0803331ca36" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_33b553d9d134b80813bc1664890" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
