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
	Req,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('invoice')
export class InvoiceController {
	constructor(private readonly invoiceService: InvoiceService) {}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	@UsePipes(ValidationPipe)
	create(@Req() req, @Body() createInvoiceDto: CreateInvoiceDto) {
		return this.invoiceService.create(req.user.id, createInvoiceDto);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	findAll(@Req() req) {
		return this.invoiceService.findAll(req.user.id);
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	findOne(@Req() req, @Param('id') id: string) {
		return this.invoiceService.findOne(+id);
	}

	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	@UsePipes(ValidationPipe)
	update(
		@Req() req,
		@Param('id') id: string,
		@Body() updateInvoiceDto: UpdateInvoiceDto,
	) {
		return this.invoiceService.update(+id, updateInvoiceDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	remove(@Param('id') id: string) {
		return this.invoiceService.remove(+id);
	}
}
