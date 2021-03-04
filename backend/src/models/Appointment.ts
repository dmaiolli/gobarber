import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

/*
  1:1
  1:N
  N:M
*/

/* eslint-disable camelcase */

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Uma função que retorna qual o model que ele deve utilizar
  @JoinColumn({ name: 'provider_id' }) // Qual a coluna que irá identificar qual usuário é o prestador do agendamento
  provider: User; // Aqui estamos relacionando o provider com o objeto

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
