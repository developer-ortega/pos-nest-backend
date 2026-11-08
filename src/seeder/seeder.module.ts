import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: typeOrmConfig,
            inject: [ConfigService]
        }),
    ],

    providers: [SeederService]
})
export class SeederModule { }
