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
		let invoiceTotal = 0;
		createInvoiceDto.items.forEach((item) => {
			item.total = item.quantity * item.price;
			invoiceTotal += item.total;
			items.push(this.itemRepository.create({ ...item }));
		});
		createInvoiceDto.total = invoiceTotal;

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

	async findOne(id: number) {
		return await this.invoiceRepository.findOne(id);
	}

	async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
		const invoice = await this.invoiceRepository.findOne(id);
		if (!invoice)
			throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);

		const { clientAddress, senderAddress, items, ...invoiceData } =
			updateInvoiceDto;

		await this.addressRepository.update(clientAddress.id, clientAddress);
		await this.addressRepository.update(senderAddress.id, senderAddress);

		let invoiceTotal = 0;
		items.forEach(async (item) => {
			item.total = item.quantity * item.price;
			invoiceTotal += item.total;
			await this.itemRepository.update(item.id, item);
		});

		invoiceData.total = invoiceTotal;

		return await this.invoiceRepository.update(id, invoiceData);
	}

	async remove(id: number): Promise<Invoice> {
		const invoice = await this.invoiceRepository.findOne(id);
		if (!invoice)
			throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);

		const deleted = await this.invoiceRepository.remove(invoice);
		await this.addressRepository.remove(deleted.clientAddress);
		await this.addressRepository.remove(deleted.senderAddress);
		return deleted;
	}
}
