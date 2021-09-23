import {
	Body,
	Controller,
	Post,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePicStorage } from 'src/common/profilePicStorage';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateUserDto) {
		return this.userService.create(createDto);
	}

	// @Post('login')
	// login(@Body() loginDto: LoginUserDto) {
	// 	return this.userService.validateUser(
	// 		loginDto.username,
	// 		loginDto.password,
	// 	);
	// }

	@Post('change-password')
	changePassword(@Body() updateDto: UpdateUserDto) {
		return this.userService.update(1, updateDto);
	}

	@Post('profile-picture')
	@UseInterceptors(FileInterceptor('file', ProfilePicStorage.configuration()))
	async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
		const cleanedPath = file.path.substring(
			'public/'.length,
			file.path.length,
		);
		return await this.userService.setProfilePicture(
			body.userId,
			cleanedPath,
		);
	}
}
