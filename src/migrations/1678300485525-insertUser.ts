import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertUser1678300485525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'INSERT INTO "user" ("lastName","firstName") VALUES (\'Evenot\', \'Aurélien\')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM user
      `);
  }
}
