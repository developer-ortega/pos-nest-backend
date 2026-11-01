import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity.js';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) { }
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({ id: createProductDto.categoryId });
    if (!category) {
      let errors: string[] = [];
      errors.push(`La categoría con ID ${createProductDto.categoryId} no existe.`)
      throw new NotFoundException(errors)
    }

    return this.productRepository.save({
      ...createProductDto,
      category
    })
  }

  async findAll(categoryId: number | null, take: number, skip: number) {

    const options : FindManyOptions<Product> = {
      relations: {
        category: true
      },
      order: {
        id: 'DESC'
      },
      take,
      skip
    }

    if (categoryId) {
      options.where = {
        category: {
          id: categoryId
        }
      }
    }

    const [ products, total ] = await this.productRepository.findAndCount(options);

    return {
      products,
      total
    }

  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id
      },
      relations: {
        category: true
      }
    })

    if (!product) {
      throw new NotFoundException(`El producto con el ID ${id} no existe.`)
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
