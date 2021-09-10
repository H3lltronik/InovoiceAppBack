import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(dto: CreateUserDto): Promise<User> {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(dto.password, salt);

		const user = this.userRepository.create({
			username: dto.username,
			password: hashedPass,
		});

		try {
			return await this.userRepository.save(user);
		} catch (error) {
			if (error instanceof QueryFailedError) {
				throw new HttpException(
					'Username already exists',
					HttpStatus.CONFLICT,
				);
			}
		}
	}

	async update(id: number, dto: UpdateUserDto): Promise<User> {
		const user = await this.userRepository.findOne(id);
		if (!user)
			throw new HttpException(
				"User doesn't exists",
				HttpStatus.NOT_FOUND,
			);

		const isPswdOk = await bcrypt.compare(dto.oldPassword, user.password);

		if (!isPswdOk)
			throw new HttpException(
				"Passwords doesn't match",
				HttpStatus.NOT_FOUND,
			);

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(dto.password, salt);

		user.password = hashedPass;
		return this.userRepository.save(user);
	}

	async validateUser(username: string, password: string) {
		const user = await this.userRepository.findOneOrFail({
			where: { username },
		});

		const isPswdOk = await bcrypt.compare(password, user.password);

		if (user && isPswdOk) {
			const { password, ...rest } = user;
			return rest;
		}

		throw new HttpException('Wrong credentials', HttpStatus.NOT_FOUND);
	}
}
