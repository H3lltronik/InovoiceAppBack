import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Item } from './entities/item.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
	controllers: [InvoiceController],
	providers: [InvoiceService],
	imports: [TypeOrmModule.forFeature([Invoice, Address, Item, User])],
})
export class InvoiceModule {}
