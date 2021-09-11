import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('item')
export class Item {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	quantity: number;

	@Column()
	price: number;

	@Column()
	total: number;

	@ManyToOne(() => Invoice, (invoice) => invoice.items, {
		cascade: ['remove'],
		onDelete: 'CASCADE',
	})
	invoice: Invoice;
}
