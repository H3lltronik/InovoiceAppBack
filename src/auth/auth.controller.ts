import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Req() req, @Res({ passthrough: true }) res: Response) {
		const tokens = await this.authService.getTokens(req.user);

		res.cookie('refresh_token', tokens.refresh_token, {
			httpOnly: true,
			sameSite: 'strict',
		});

		return tokens;
	}

	@Post('logout')
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		await this.authService.removeTokens(req.cookies.refresh_token);
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('check-token')
	async checkToken(@Req() req, @Res({ passthrough: true }) res: Response) {
		return req.user;
	}

	@UseGuards(JwtAuthGuard)
	@Post('refresh-token')
	async refreshToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokens = await this.authService.doRefreshToken(
			req.cookies.refresh_token,
		);

		res.cookie('refresh_token', tokens.refresh_token, {
			httpOnly: true,
			sameSite: 'strict',
		});

		return tokens;
	}
}
