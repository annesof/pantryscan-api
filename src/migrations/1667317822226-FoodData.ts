import { MigrationInterface, QueryRunner } from 'typeorm';

export class FoodData1667317822226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'INSERT INTO "food" ("expirationDate", "productEan","started","locationId") VALUES (\'2019-04-05\', \'3083680002929\', false,\'FRIGO\')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO location (id, name) VALUES ('FRIGO', 'refrigerateur' )",
    );
  }
}
