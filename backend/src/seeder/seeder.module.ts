import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config.js';
import { Product } from '../products/entities/product.entity.js';
import { Category } from '../categories/entities/category.entity.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: typeOrmConfig,
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([
            Product, Category
        ])
    ],

    providers: [SeederService]
})
export class SeederModule { }
