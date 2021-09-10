import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { Address } from '../entities/address.entity';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsDate, IsNotEmpty, ValidateNested } from 'class-validator';
import { Item } from '../entities/item.entity';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
	@IsNotEmpty()
	@IsDate()
	paymentDue: Date;

	@IsNotEmpty()
	description: string;

	@IsNotEmpty()
	paymentTerms: number;

	@IsNotEmpty()
	clientName: string;

	@IsNotEmpty()
	clientEmail: string;

	@IsNotEmpty()
	status: string;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => Address)
	senderAddress: Address;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => Address)
	clientAddress: Address;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => Item)
	items: Item[];

	@IsNotEmpty()
	total: number;
}
