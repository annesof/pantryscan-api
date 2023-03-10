import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertLocation1678299835774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO location (id,name) VALUES ('PHAUT', 'Placard haut'), ('CEL', 'Cellier'), ('CONG', 'Congélateur')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM location
    `);
  }
}
