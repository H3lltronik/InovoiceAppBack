import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { Address } from '../entities/address.entity';
import { CreateInvoiceDto } from './create-invoice.dto';
import {
	IsDate,
	IsDateString,
	IsDefined,
	IsNotEmpty,
	ValidateNested,
} from 'class-validator';
import { Item } from '../entities/item.entity';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
	@IsNotEmpty()
	@IsDateString()
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
	@IsDefined()
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

	total: number;
}

/**
 * 
 * declare module namespace {

    export interface SenderAddress {
        street: string;
        city: string;
        postCode: string;
        country: string;
    }

    export interface ClientAddress {
        street: string;
        city: string;
        postCode: string;
        country: string;
    }

    export interface Item {
        name: string;
        quantity: number;
        price: number;
        total: number;
    }

    export interface RootObject {
        id: string;
        createdAt: string;
        paymentDue: string;
        description: string;
        paymentTerms: number;
        clientName: string;
        clientEmail: string;
        status: string;
        senderAddress: SenderAddress;
        clientAddress: ClientAddress;
        items: Item[];
        total: number;
    }

}
 */
