import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1607956492151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name:'comments',
            columns:[
                {name:'id',isGenerated:true,isPrimary:true,generationStrategy:'increment',type:'int'},
                {name:'user_id',type:'int'},
                {name:'post_id',type:'int'},
                {name:'content',type:'text'},
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('comments')
    }
}
