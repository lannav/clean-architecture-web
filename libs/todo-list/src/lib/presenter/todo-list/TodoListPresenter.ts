import { ITodoListPresenter } from './ITodoListPresenter';
import { IRepository } from '@clean/details';
import { ITodo } from '../../application/_models/ITodo';
import { ITodoCreate } from '../../application/_models/ITodoCreate';
import { ICreateTodoUseCase } from '../../application/create/ICreateTodoUseCase';
import { IDeleteTodoUseCase } from '../../application/delete/IDeleteTodoUseCase';
import { IUpdateTodoUseCase } from '../../application/update/IUpdateTodoUseCase';
import { IReadTodoUseCase } from '../../application/read/IReadTodoUseCase';
import { ICreateCurrency, ICurrency, IReadCurrency } from '@clean/currencies';
import { ITodoPreview } from './ITodoPreview';

export class TodoListPresenter implements ITodoListPresenter {
  constructor(
    private repository: IRepository<ITodo[]>,
    private createUseCase: ICreateTodoUseCase,
    private deleteUseCase: IDeleteTodoUseCase,
    private updateUseCase: IUpdateTodoUseCase,
    private readUseCase: IReadTodoUseCase,
    private createLoadingRepository: IRepository<boolean>,
    private listLoadingRepository: IRepository<boolean>,
    private itemsLoadingRepository: IRepository<Record<string, boolean>>,
    private readCurrency: IReadCurrency,
    private createCurrencyUseCase: ICreateCurrency,
  ) { this.loadList() }

  async loadList(): Promise<void> {
    this.listLoadingRepository.save(true);

    await this.readUseCase.read();

    this.listLoadingRepository.save(false);
  }

  get todos(): ITodoPreview[] {
    const data = this.repository.data ?? [];

    return data.map(it => ({
      ...it,
      currencySign: this.readCurrency.currency?.sign ?? '',
    }));
  }

  async create(todo: ITodoCreate): Promise<void> {
    this.createLoadingRepository.save(true);

    await this.createUseCase.create(todo);

    this.createLoadingRepository.save(false);
  }

  createCurrency(): void {
    this.createCurrencyUseCase.create({
      code: Math.random(),
      name: `${Math.random()}`,
      sign: `${Math.random()}`,
    });
  }

  async delete(id: string): Promise<void> {
    const itemLoading = {
      ...this.itemsLoadingRepository.data,
      [id]: true,
    };

    this.itemsLoadingRepository.save(itemLoading);

    await this.deleteUseCase.delete(id);

    const itemLoaded = {
      ...this.itemsLoadingRepository.data,
      [id]: false,
    };

    this.itemsLoadingRepository.save(itemLoaded);
  }

  async onCheck(id: string): Promise<void> {
    const currentItem = this.repository.data?.find(it => it.id === id);

    if (currentItem) {
      const itemLoading = {
        ...this.itemsLoadingRepository.data,
        [id]: true,
      };

      this.itemsLoadingRepository.save(itemLoading);

      await this.updateUseCase.update({
        ...currentItem,
        checked: !currentItem.checked,
      });

      const itemLoaded = {
        ...this.itemsLoadingRepository.data,
        [id]: false,
      };

      this.itemsLoadingRepository.save(itemLoaded);
    }
  }

  get isCreateLoading(): boolean {
    return this.createLoadingRepository.data ?? false;
  }

  get isListLoading(): boolean {
    return this.listLoadingRepository.data ?? false;
  }

  isItemLoading(id: string): boolean {
    return this.itemsLoadingRepository.data?.[id] ?? false;
  }
}
