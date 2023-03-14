import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertCategories1678300637484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Petit Dej', NULL), ('Biscuit', NULL), ('Légumes', '#a5d6a7'), ('Lapin / Volaille', '#ef9a9a')",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Chocolat', NULL), ('Sucre', NULL), ('Féculents', '#fff59d'), ('Conserves', '#80deea')",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Surgelés', '#80deea'), ('Plats préparés', '#b39ddb'), ('Riz', '#fff59d'), ('Blé', '#80deea')",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Pâtes', '#80deea'), ('Viande', '#ef9a9a'), ('Condiment', NULL), ('Apéritif', NULL)",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Poisson', '#90caf9'), ('Laitages', NULL), ('Asiatique', NULL), ('Aide culinaire', NULL)",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Charcuterie', '#ef9a9a'), ('Légumes secs', '#a5d6a7'), ('Soupe', NULL), ('Fruits', '#a5d6a7')",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Boissons', NULL), ('Sauce', NULL), ('Epicerie salée', NULL)",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Dessert', NULL), ('Vin', NULL), ('Boeuf', '#ef9a9a'), ('Porc', '#ef9a9a')",
    );
    queryRunner.query(
      "INSERT INTO category (name,color) VALUES ('Grilades', NULL), ('Céréale', '#fff59d'), ('Epicerie sucrée', NULL), ('Couscous', '#fff59d')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM category
          `);
  }
}
