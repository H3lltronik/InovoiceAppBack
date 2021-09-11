import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('address')
export class Address {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	street: string;

	@Column()
	city: string;

	@Column()
	postCode: string;

	@Column()
	country: string;

	@OneToOne(() => Invoice)
	invoice: Invoice;
}
