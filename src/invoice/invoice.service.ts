import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Address } from './entities/address.entity';
import { Invoice } from './entities/invoice.entity';
import { Item } from './entities/item.entity';

@Injectable()
export class InvoiceService {
	constructor(
		@InjectRepository(Address)
		private addressRepository: Repository<Address>,
		@InjectRepository(Invoice)
		private invoiceRepository: Repository<Invoice>,
		@InjectRepository(Item)
		private itemRepository: Repository<Item>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
		const senderAddress = this.addressRepository.create({
			...createInvoiceDto.senderAddress,
		});
		const clientAddress = this.addressRepository.create({
			...createInvoiceDto.clientAddress,
		});

		const items = [];
		createInvoiceDto.items.forEach((item) => {
			items.push(this.itemRepository.create({ ...item }));
		});

		const user = await this.userRepository.findOne(1);

		const invoice = this.invoiceRepository.create({
			...createInvoiceDto,
			clientAddress,
			senderAddress,
			items,
			user,
		});

		return await this.invoiceRepository.save(invoice);
	}

	findAll(): Promise<Invoice[]> {
		return this.invoiceRepository.find();
	}

	findOne(id: number) {
		return `This action returns a #${id} invoice`;
	}

	update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
		return `This action updates a #${id} invoice`;
	}

	async remove(id: number): Promise<Invoice> {
		const invoice = await this.invoiceRepository.find();
		if (!invoice)
			throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);

		return await this.invoiceRepository.remove(invoice[0]);
	}
}
