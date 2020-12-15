import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCreateAtAndAddUpdateAt1607959248876 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('posts', [
      new TableColumn({name: 'createdAt', type: 'timestamp', default: 'now()', isNullable: false}),
      new TableColumn({name: 'updatedAt', type: 'timestamp', default: 'now()', isNullable: false})
    ])
    await queryRunner.addColumns('users', [
      new TableColumn({name: 'createdAt', type: 'timestamp', default: 'now()', isNullable: false}),
      new TableColumn({name: 'updatedAt', type: 'timestamp', default: 'now()', isNullable: false})
    ])
    await queryRunner.addColumns('comments', [
      new TableColumn({name: 'createdAt', type: 'timestamp', default: 'now()', isNullable: false}),
      new TableColumn({name: 'updatedAt', type: 'timestamp', default: 'now()', isNullable: false})
    ])
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users','createAt')
    await queryRunner.dropColumn('users','updateAt')
    await queryRunner.dropColumn('posts','createAt')
    await queryRunner.dropColumn('posts','updateAt')
    await queryRunner.dropColumn('comments','createAt')
    await queryRunner.dropColumn('comments','updateAt')
  }
  
}
