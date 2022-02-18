import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
	type: 'mariadb',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'test',
	synchronize: false,
	entities: ['dist/src/**/*.entity.js'],
	migrations: ['dist/src/db/migrations/*.js'],
	logging: false,
	cli: {
		migrationsDir: 'src/db/migrations',
	},
};

export default config;
