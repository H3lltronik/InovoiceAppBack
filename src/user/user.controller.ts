import {
	Body,
	Controller,
	Post,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePicStorage } from 'src/common/profilePicStorage';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

const fs = require('fs');
const sharp = require('sharp');

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateUserDto) {
		return this.userService.create(createDto);
	}

	@Post('change-password')
	changePassword(@Body() updateDto: UpdateUserDto) {
		return this.userService.update(1, updateDto);
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('profile-picture')
	@UseInterceptors(FileInterceptor('file', ProfilePicStorage.configuration()))
	async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
		const filename = req.file.path;
		const filenamePath = `${req.file.destination}${req.file.filename}`;
		const resizedPath = `${req.file.destination}resized-${req.file.filename}`;

		await sharp(filename)
			.resize(200, 200)
			.jpeg({ quality: 90 })
			.toFile(resizedPath);

		fs.rmSync(filenamePath);

		const cleanedPath = resizedPath.substring(
			'./public/'.length,
			resizedPath.length,
		);

		return await this.userService.setProfilePicture(
			req.user.id,
			cleanedPath,
		);
	}
}
