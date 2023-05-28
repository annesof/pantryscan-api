import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationInput } from './dto/create-location.input';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationInput: CreateLocationInput): Promise<Location> {
    const location = this.locationRepository.create(createLocationInput);
    return this.locationRepository.save(location);
  }

  async update(id: string, name: string): Promise<Location> {
    if (name !== '') {
      const location = await this.locationRepository.findOneOrFail({
        where: { id },
      });
      location.name = name;
      return this.locationRepository.save(location);
    }
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async findOne(id: string): Promise<Location> {
    return await this.locationRepository.findOne({ where: { id } });
  }
}
