import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('invoice')
export class InvoiceController {
	constructor(private readonly invoiceService: InvoiceService) {}

	@Post()
	@UsePipes(ValidationPipe)
	create(@Body() createInvoiceDto: CreateInvoiceDto) {
		return this.invoiceService.create(createInvoiceDto);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	findAll() {
		return this.invoiceService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.invoiceService.findOne(+id);
	}

	@Patch(':id')
	@UsePipes(ValidationPipe)
	update(
		@Param('id') id: string,
		@Body() updateInvoiceDto: UpdateInvoiceDto,
	) {
		return this.invoiceService.update(+id, updateInvoiceDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.invoiceService.remove(+id);
	}
}
