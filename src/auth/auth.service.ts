import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string) {
		const user = await this.userService.findOneByUsername(username);

		const isPswdOk = await bcrypt.compare(password, user.password);

		if (user && isPswdOk) {
			const { password, ...rest } = user;
			return rest;
		}

		throw new HttpException('Wrong credentials', HttpStatus.NOT_FOUND);
	}

	async getTokens(user: User) {
		const payload = { username: user.username, sub: user.password };

		const access_token = this.jwtService.sign(payload);
		const refresh_token = this.jwtService.sign(payload, {
			expiresIn: '7d',
		});

		this.userService.addRefreshToken(user.id, refresh_token);

		return {
			access_token,
			refresh_token,
		};
	}

	async doRefreshToken(refreshToken: string) {
		if (!refreshToken)
			throw new HttpException(
				'Provide a refresh token',
				HttpStatus.NOT_ACCEPTABLE,
			);

		const res = await this.jwtService.verify(refreshToken);

		if (!res)
			throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);

		const user = await this.userService.findOneByUsername(res.username);

		if (!user)
			throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);

		return await this.getTokens(user);
	}

	async removeTokens(refreshToken: string) {
		if (!refreshToken)
			throw new HttpException(
				'Provide a refresh token',
				HttpStatus.NOT_ACCEPTABLE,
			);

		const res = await this.jwtService.verify(refreshToken);

		if (!res)
			throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);

		const user = await this.userService.findOneByUsername(res.username);

		if (!user)
			throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);

		return await this.userService.addRefreshToken(user.id, null);
	}
}
