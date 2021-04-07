import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1617753243819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let hasDatabase = await queryRunner.hasDatabase("edtech");

    if (!hasDatabase) {
      await queryRunner.createDatabase("edtech", true);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase("edtech");
  }
}
