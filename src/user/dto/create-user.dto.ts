import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/common/match.decorator';

export class CreateUserDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	@Match('password', { message: "Password confirmation doesn't match" })
	confirmPassword: string;
}
