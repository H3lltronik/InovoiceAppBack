import { User } from 'src/user/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Item } from './item.entity';

@Entity('Invoice')
export class Invoice {
	@PrimaryGeneratedColumn()
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@CreateDateColumn()
	paymentDue: Date;

	@Column()
	description: string;

	@Column()
	paymentTerms: number;

	@Column()
	clientName: string;

	@Column()
	clientEmail: string;

	@Column()
	status: string;

	@OneToOne(() => Address)
	senderAddress: Address;

	@OneToOne(() => Address)
	clientAddress: Address;

	@OneToMany(() => Item, (item) => item.invoice)
	items: Item[];

	@Column()
	total: number;

	@ManyToOne(() => User, (user) => user.invoices)
	user: User;
}
