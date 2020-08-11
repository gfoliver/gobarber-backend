import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAppointments1593129559994 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'appointments',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment', isGenerated: true },
                { name: 'provider_id', type: 'int', isNullable: true },
                { name: 'date', type: 'timestamp with time zone' },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
                { name: 'updated_at', type: 'timestamp', default: 'now()' },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments')
    }
}
