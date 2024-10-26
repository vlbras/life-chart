import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { AbstractEntity } from './abstract.entity';
import { AbstractMapper } from './abstract.mapper';
import { AbstractModel } from './abstract.model';

export abstract class AbstractQueryRepository<
  TEntity extends AbstractEntity,
  TModel extends AbstractModel,
  TMapper extends AbstractMapper<TEntity, TModel>,
> {
  public constructor(
    protected readonly entity: Model<TEntity>,
    protected readonly mapper: TMapper,
  ) {}

  private readonly logger = new Logger(AbstractQueryRepository.name);

  public async findMany(filterQuery: FilterQuery<TEntity> = {}): Promise<TModel[]> {
    const entities = await this.entity.find(filterQuery).sort({ _id: 1 }).lean();
    return entities.map(entity => this.mapper.mapEntityToModel(entity as TEntity));
  }

  public async findOne(filterQuery: FilterQuery<TEntity>): Promise<TModel | null> {
    if (Object.keys(filterQuery).length === 0) {
      const message = `Filter query is required to find ${this.entity.modelName}`;
      this.logger.error(`FindOne: ${message}`);
      throw new BadRequestException(message);
    }

    const entity = await this.entity.findOne(filterQuery).lean();
    return entity ? this.mapper.mapEntityToModel(entity as TEntity) : null;
  }

  public async findOneOrFail(filterQuery: FilterQuery<TEntity>): Promise<TModel> {
    const entity = await this.findOne(filterQuery);

    if (!entity) {
      const message = `${this.entity.modelName} not found`;
      this.logger.error(`FindOne: ${message}, filter: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException(message);
    }

    return entity;
  }

  public async exists(filterQuery: FilterQuery<TEntity>): Promise<boolean> {
    if (Object.keys(filterQuery).length === 0) {
      const message = `Filter query is required to check if ${this.entity.modelName} exists`;
      this.logger.error(`CheckIfExists: ${message}`);
      throw new BadRequestException(message);
    }

    return !!(await this.entity.exists(filterQuery));
  }
}

type FilterQuery<T> = Partial<Omit<T, '_id'>> & { _id?: string };
