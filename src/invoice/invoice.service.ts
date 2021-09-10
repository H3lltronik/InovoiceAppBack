import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
	) {}

	create(createInvoiceDto: CreateInvoiceDto) {
		const senderAddress = this.addressRepository.create({
			...createInvoiceDto,
		});
		const clientAddress = this.addressRepository.create({
			...createInvoiceDto,
		});

		const items = [];
		createInvoiceDto.items.forEach((item) => {
			items.push(this.itemRepository.create({ ...item }));
		});

		const invoice = this.invoiceRepository.create({
			paymentDue: createInvoiceDto.paymentDue,
			description: createInvoiceDto.description,
			paymentTerms: createInvoiceDto.paymentTerms,
			clientName: createInvoiceDto.clientName,
			clientEmail: createInvoiceDto.clientEmail,
			status: createInvoiceDto.status,
			senderAddress: createInvoiceDto.senderAddress,
			clientAddress: createInvoiceDto.clientAddress,
			items: createInvoiceDto.items,
			total: createInvoiceDto.total,
		});
	}

	findAll() {
		return `This action returns all invoice`;
	}

	findOne(id: number) {
		return `This action returns a #${id} invoice`;
	}

	update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
		return `This action updates a #${id} invoice`;
	}

	remove(id: number) {
		return `This action removes a #${id} invoice`;
	}
}
