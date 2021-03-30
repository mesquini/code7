import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity('dividends', {database: 'debts'})
class Dividends {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('number')
  user_id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  reason: string;

  @Column('varchar')
  price: string;

  @Column('varchar')
  date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Dividends;
