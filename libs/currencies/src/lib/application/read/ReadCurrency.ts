import { IReadCurrency } from './IReadCurrency';
import { ICurrency } from '../_models/ICurrency';
import { IRepository } from '@clean/details';

export class ReadCurrency implements IReadCurrency {
  constructor(
    private repository: IRepository<ICurrency>,
  ) {}

  get currency(): ICurrency | null {
    return this.repository.data;
  }
}
