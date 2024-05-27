import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingLtiv3FeaturesBooleanFlags1713281747104
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "isLtiV3DeeplinkingEnabled" boolean DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD "isLtiV3GradeServiceEnabled" boolean DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "isLtiV3DeeplinkingEnabled"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP COLUMN "isLtiV3GradeServiceEnabled"`,
    );
  }
}
