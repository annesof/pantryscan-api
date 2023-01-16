import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductData1667300852848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO product VALUES ('3083680002929', 'Bonduelle', 'Macédoine de légumes',  'Macédoine de légumes ', 'Légumes : 50 % de légumes verts (petits pois, haricots verts coupés, flageolets verts), carottes coupées et navets coupées. Jus (eau, sel).', 'a',  'https://static.openfoodfacts.org/images/products/308/368/000/2929/front_fr.10.400.jpg', 'https://static.openfoodfacts.org/images/products/308/368/000/2929/front_fr.10.200.jpg', '265 g','130 g (égoutté) Cette boîte contient 2 portions.' )",
    );
    queryRunner.query(
      "INSERT INTO location (id, name) VALUES ('FRIGO', 'refrigerateur' )",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('df');
  }
}
