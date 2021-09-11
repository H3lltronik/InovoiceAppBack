import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ nullable: true })
	profilePicture: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	refreshToken: string;

	@OneToMany(() => Invoice, (invoice) => invoice.user)
	invoices: Invoice[];
}
