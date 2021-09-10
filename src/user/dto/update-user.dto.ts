import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/common/match.decorator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	@Match('password', { message: "Password confirmation doesn't match" })
	confirmPassword: string;

	@IsNotEmpty()
	oldPassword: string;
}
