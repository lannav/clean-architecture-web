import { IReadCurrency } from '../application/read/IReadCurrency';
import { ICreateCurrency } from '../application/create/ICreateCurrency';

export interface ICurrenciesUseCases {
  readCurrencies: IReadCurrency;
  createCurrencies: ICreateCurrency;
}
