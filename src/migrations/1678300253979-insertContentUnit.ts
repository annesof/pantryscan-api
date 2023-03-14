import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertContentUnit1678300253979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO content_unit (name) VALUES ('pièces(s)'), ('boîte(s)')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM content_unit
  `);
  }
}
