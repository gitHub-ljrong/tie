import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  typeorm = {
    type: 'mysql',
    host: '10.11.100.161',
    port: 3306,
    username: 'sw',
    password: 'Kingsoft+520',
    database: 'sw_larp',
    synchronize: false,
    logging: true,
    entities: ['./user/**/*.entity.ts'],
    migrations: ['./migration/**/*.ts'],
    subscribers: ['./subscriber/**/*.ts'],
    cli: {
      entitiesDir: './entity',
      migrationsDir: './migration',
      subscribersDir: './subscriber',
    },
  }
}
