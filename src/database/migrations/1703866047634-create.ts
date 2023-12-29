import { MigrationInterface, QueryRunner } from 'typeorm';

export class Create1703866047634 implements MigrationInterface {
  name = 'Create1703866047634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "value" character varying, "description" character varying, CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value"), CONSTRAINT "UQ_6521db71370e3fecb07064ce930" UNIQUE ("description"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "desert_types" ("id" SERIAL NOT NULL, "type" character varying, CONSTRAINT "PK_4c23911007eb3d0b21cfc2f6876" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "totalCost" integer NOT NULL, "number" integer NOT NULL, "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "desrt_filling" ("id" SERIAL NOT NULL, "name" character varying, "imagePath" character varying, CONSTRAINT "PK_245ad669c839e7dd27edb1928e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "desert" ("id" SERIAL NOT NULL, "type" character varying, "name" character varying, "price" integer, "imagePath" character varying, "weight" integer, "composition" character varying, "flavor" character varying, "decor" character varying, "numberOfTiers" integer, "for" character varying, "quantity" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_719fe686ce35aeb1cb212e18f34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying, "password" character varying, "phone" character varying, "email" character varying, "hash" character varying, "isConfirm" boolean NOT NULL DEFAULT false, "online" boolean NOT NULL DEFAULT false, "role" character varying DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_to_desert" ("orderId" integer NOT NULL, "desertId" integer NOT NULL, CONSTRAINT "PK_582623f859a7d3038ac1fbf47b5" PRIMARY KEY ("orderId", "desertId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cab2e82567c9774b0803331ca3" ON "order_to_desert" ("orderId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_33b553d9d134b80813bc166489" ON "order_to_desert" ("desertId") `,
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
      `CREATE TABLE "favorite_deserts" ("desertId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_4c4fdca4d5ed1e74ea78d7dfc4d" PRIMARY KEY ("desertId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01355e353f96d3d6747fb8511c" ON "favorite_deserts" ("desertId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f3237b695c00a4665abe82f82" ON "favorite_deserts" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_cab2e82567c9774b0803331ca36" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" ADD CONSTRAINT "FK_33b553d9d134b80813bc1664890" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23" FOREIGN KEY ("desrtFillingId") REFERENCES "desrt_filling"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" ADD CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_deserts" ADD CONSTRAINT "FK_01355e353f96d3d6747fb8511cb" FOREIGN KEY ("desertId") REFERENCES "desert"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_deserts" ADD CONSTRAINT "FK_8f3237b695c00a4665abe82f82f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite_deserts" DROP CONSTRAINT "FK_8f3237b695c00a4665abe82f82f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_deserts" DROP CONSTRAINT "FK_01355e353f96d3d6747fb8511cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_f3b191bf1bf5a0031191d431c6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "filling_to_desert" DROP CONSTRAINT "FK_51240904a5b253c9a2a96fe2a23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_33b553d9d134b80813bc1664890"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_to_desert" DROP CONSTRAINT "FK_cab2e82567c9774b0803331ca36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8f3237b695c00a4665abe82f82"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01355e353f96d3d6747fb8511c"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_deserts"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f3b191bf1bf5a0031191d431c6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51240904a5b253c9a2a96fe2a2"`,
    );
    await queryRunner.query(`DROP TABLE "filling_to_desert"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_33b553d9d134b80813bc166489"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cab2e82567c9774b0803331ca3"`,
    );
    await queryRunner.query(`DROP TABLE "order_to_desert"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "desert"`);
    await queryRunner.query(`DROP TABLE "desrt_filling"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "desert_types"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
