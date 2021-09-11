import { User } from 'src/user/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Item } from './item.entity';

@Entity('invoice')
export class Invoice {
	@PrimaryGeneratedColumn()
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column()
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

	@OneToOne(() => Address, (senderAddress) => senderAddress.invoice, {
		cascade: true,
		onDelete: 'CASCADE',
		eager: true,
	})
	@JoinColumn()
	senderAddress: Address;

	@OneToOne(() => Address, (clientAddress) => clientAddress.invoice, {
		cascade: true,
		onDelete: 'CASCADE',
		eager: true,
	})
	@JoinColumn()
	clientAddress: Address;

	@OneToMany(() => Item, (item) => item.invoice, {
		cascade: ['insert'],
		eager: true,
	})
	@JoinColumn()
	items: Item[];

	@Column()
	total: number;

	@ManyToOne(() => User, (user) => user.invoices)
	user: User;
}
