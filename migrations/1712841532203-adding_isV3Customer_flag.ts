import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingIsV3CustomerFlag1712841532203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "isLtiV3Customer" boolean DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "ltiV3ClientId" varchar(100) DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "isLtiV3Customer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "ltiV3ClientId"`,
    );
  }
}
