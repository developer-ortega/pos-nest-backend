import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { Category } from './entities/category.entity.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number, products?: string) {

    const options : FindManyOptions<Category> = {
      where: {
        id
      }
    }

    if(products === "true") {
      options.relations = {
        products: true
      }
    }


    const category = await this.categoryRepository.findOne( options );
    if (!category) {
      throw new NotFoundException(`La categoria con el id ${id} no existe`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto
    });
    if (!category) {
      throw new NotFoundException(`La categoria con el id ${id} no existe`);
    }
    return category;
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepository.delete(category);
    return "Categoria eliminada exitosamente";
  }
}
