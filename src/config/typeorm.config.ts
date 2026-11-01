import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig = (configservice : ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configservice.get('DATABASE_HOST'),
    port: configservice.get('DATABASE_PORT'),
    username: configservice.get('DATABASE_USER'),
    password: configservice.get('DATABASE_PASS'),
    database: configservice.get('DATABASE_NAME'),
    ssl: true,
    logging: true
})