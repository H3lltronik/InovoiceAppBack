import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InvoiceModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
