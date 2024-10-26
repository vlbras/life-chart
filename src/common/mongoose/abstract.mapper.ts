import { AbstractEntity } from './abstract.entity';
import { AbstractModel } from './abstract.model';

export abstract class AbstractMapper<TEntity extends AbstractEntity, TModel extends AbstractModel> {
  public abstract mapEntityToModel(entity: TEntity): TModel;
}
