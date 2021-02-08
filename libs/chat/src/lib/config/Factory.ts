import { Connector } from '@clean/details';
import { IChatUseCases } from './IChatUseCases';
import { mockUseCases } from './MockFactory';

export class Factory {
  private static _useCases: IChatUseCases;

  static get useCases(): IChatUseCases {
    if (this._useCases) {
      return this._useCases;
    }

    this._useCases = new Factory().getUseCases();

    return this._useCases;
  }

  private getUseCases(): IChatUseCases {
    return {
      ...mockUseCases,
    };
  }
}

export const connector = new Connector<IChatUseCases>();
