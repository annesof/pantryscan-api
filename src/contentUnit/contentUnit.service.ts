import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentUnit } from './contentUnit.entity';

@Injectable()
export class ContentUnitService {
  constructor(
    @InjectRepository(ContentUnit)
    private contentUnitRepository: Repository<ContentUnit>,
  ) {}

  async findAll(): Promise<ContentUnit[]> {
    return this.contentUnitRepository.find();
  }

  async findOne(id: number): Promise<ContentUnit> {
    return await this.contentUnitRepository.findOne({ where: { id } });
  }
}
