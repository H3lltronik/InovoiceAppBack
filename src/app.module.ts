import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';

@Module({
	imports: [
		InvoiceModule,
		UserModule,
		AuthModule,
		TypeOrmModule.forRoot(config),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
