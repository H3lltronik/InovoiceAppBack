import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	// const app = await NestFactory.create(AppModule);
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(cookieParser());
	app.useStaticAssets(join(__dirname, '..', '..', 'public'));
	app.enableCors({
		origin: 'http://192.168.100.3:3000',
		credentials: true,
	});
	await app.listen(4000);
}
bootstrap();
