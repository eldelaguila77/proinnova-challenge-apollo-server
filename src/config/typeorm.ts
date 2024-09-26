import { DataSource } from 'typeorm';
import path from 'path';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'mypassword',
    database: 'challenge_proinnova',
    entities: [
        path.join(__dirname, '../entity/**/**.ts')
    ],
    synchronize: true,
    logging: true,
});

AppDataSource.initialize()
    .then(() => {
        console.log('TypeORM connection to PostgreSQL has been established successfully.');
    })
    .catch((error) => {
        console.log('Unable to connect to the database:', error);
    });

export { AppDataSource };