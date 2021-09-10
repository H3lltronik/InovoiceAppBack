import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Address')
export class Address {
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
}
