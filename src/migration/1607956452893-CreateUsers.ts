import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1607956452893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name:'users',
            columns:[
                {name:'id',isGenerated:true,isPrimary:true,generationStrategy:'increment',type:'int'},
                {name:'username',type:'varchar'},
                {name:'password_digest',type:'varchar'},
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('users')
    }

}
