import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
	type: 'mariadb',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'invoices-app',
	entities: ['dist/src/**/*.entity.js'],
	synchronize: true,
};

export default config;
