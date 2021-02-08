import { ICurrency } from '../_models/ICurrency';

export interface ICreateCurrency {
  create(currency: ICurrency): void;
}
