import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.name', 'ASC')
      .getMany();
  }

  async findByIds(ids: number[]): Promise<Category[]> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', {
        ids,
      })
      .getMany();
  }
}
