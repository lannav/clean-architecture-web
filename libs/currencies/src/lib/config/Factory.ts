import { ICurrenciesUseCases } from './ICurrenciesUseCases';
import { MobXRepository } from '@clean/details';
import { ICurrency } from '../application/_models/ICurrency';
import { CreateCurrency } from '../application/create/CreateCurrency';
import { ReadCurrency } from '../application/read/ReadCurrency';

export class Factory {
  private static _useCases: ICurrenciesUseCases;

  static get useCases(): ICurrenciesUseCases {
    if (this._useCases) {
      return this._useCases;
    }

    this._useCases = new Factory().getUseCases();

    return this._useCases;
  }

  private getUseCases(): ICurrenciesUseCases {
    const currenciesRepository = new MobXRepository<ICurrency[]>();

    const createCurrencies = new CreateCurrency(currenciesRepository);
    const readCurrencies = new ReadCurrency(currenciesRepository);

    return {
      createCurrencies,
      readCurrencies,
    };
  }
}
