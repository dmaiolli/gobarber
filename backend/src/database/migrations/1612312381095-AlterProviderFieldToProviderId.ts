import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1612312381095
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE', // Caso o id do usuário seja alterado

        // 1. RESTRICT: Rejeita a atualização ou exclusão de um registro da tabela pai, se houver registros na tabela filha.
        // 2. CASCADE: Atualiza ou exclui os registros da tabela filha automaticamente, ao atualizar ou excluir um registro da tabela pai.
        // 3. SET NULL: Define como null o valor do campo na tabela filha, ao atualizar ou excluir o registro da tabela pai.
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointment', 'provider_id');

    await queryRunner.addColumn(
      'appointment',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
