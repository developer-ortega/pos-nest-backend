import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity.js';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity.js';
import { categories } from './data/categories.js';
import { products } from './data/products.js';

@Injectable()
export class SeederService {

    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        private datasource : DataSource
    ){}

    async onModuleInit(){
        const connection = this.datasource
        await connection.dropDatabase()
        await connection.synchronize()
    }

    async seed(){
        await this.categoryRepository.save(categories)
        for (const seedProduct of products){
            const category = await this.categoryRepository.findOneBy({ id: seedProduct.categoryId })
            if (!category) {
                throw new Error(`La categoría con id ${seedProduct.categoryId} no existe`)
            }
            const product = new Product()
            product.name = seedProduct.name
            product.image = seedProduct.image
            product.price = seedProduct.price
            product.inventory = seedProduct.inventory
            product.category = category

            await this.productRepository.save(product)
        }
    }

}
