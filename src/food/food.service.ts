import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './food.entity';
import { CreateFoodInput } from './dto/create-food.input';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async create(createFoodInput: CreateFoodInput): Promise<Food> {
    const food = this.foodRepository.create(createFoodInput);
    return this.foodRepository.save(food);
  }

  async remove(id: number) {
    await this.foodRepository.delete(id);
  }
}
