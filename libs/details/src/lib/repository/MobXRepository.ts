import { makeAutoObservable } from 'mobx';
import { IRepository } from './IRepository';

export class MobXRepository<T> implements IRepository<T> {
  constructor() {
    makeAutoObservable(this)
  }

  data: T | null = null;

  save(data: T | null): void {
    this.data = data;
  }
}
