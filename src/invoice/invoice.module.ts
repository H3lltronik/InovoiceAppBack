import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [InvoiceController],
	providers: [InvoiceService],
	imports: [TypeOrmModule.forFeature([Invoice])],
})
export class InvoiceModule {}
