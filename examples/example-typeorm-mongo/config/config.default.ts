import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  typeorm = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'test',
    synchronize: true,
    logging: true,
    entities: ['./**/*.entity.ts'],
    migrations: ['./migration/**/*.ts'],
    subscribers: ['./subscriber/**/*.ts'],
    cli: {
      entitiesDir: './entity',
      migrationsDir: './migration',
      subscribersDir: './subscriber',
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}
