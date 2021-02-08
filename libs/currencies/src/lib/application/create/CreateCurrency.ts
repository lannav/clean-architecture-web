import { ICreateCurrency } from './ICreateCurrency';
import { IRepository } from '@clean/details';
import { ICurrency } from '../_models/ICurrency';

export class CreateCurrency implements ICreateCurrency {
  constructor(
    private repository: IRepository<ICurrency>,
  ) {}

  create(currency: ICurrency): void {
    this.repository.save(currency);
  }
}
