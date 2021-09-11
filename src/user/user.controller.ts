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

	@Post('profile-picture')
	@UseInterceptors(FileInterceptor('file'))
	profilePicture(@UploadedFile() file: Express.Multer.File) {}

	@Post('change-password')
	changePassword(@Body() updateDto: UpdateUserDto) {
		return this.userService.update(1, updateDto);
	}
}
