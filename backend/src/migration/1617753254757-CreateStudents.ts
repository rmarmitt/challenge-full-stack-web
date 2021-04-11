import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudents1617753254757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "80",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "120",
            isNullable: false,
          },
          {
            name: "academic_registry",
            type: "varchar",
            length: "80",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "14",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("students");
  }
}
