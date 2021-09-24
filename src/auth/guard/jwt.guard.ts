import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const refreshToken = request.cookies.refresh_token;
		const { username } = await this.jwtService.verify(refreshToken);

		const user = await this.userService.findOneByUsername(username);

		return user.refreshToken === refreshToken;
	}
}
