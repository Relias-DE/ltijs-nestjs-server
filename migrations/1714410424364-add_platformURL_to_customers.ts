import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPlatformURLToCustomers1714410424364
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "platformURL" character varying NOT NULL default 'NA'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "platformURL"`,
    );
  }
}
