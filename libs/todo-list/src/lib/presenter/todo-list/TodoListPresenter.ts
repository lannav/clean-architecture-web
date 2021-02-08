import { ITodoListPresenter } from './ITodoListPresenter';
import { IRepository } from '@clean/details';
import { ITodo } from '../../application/_models/ITodo';
import { ITodoCreate } from '../../application/_models/ITodoCreate';
import { ICreateTodoUseCase } from '../../application/create/ICreateTodoUseCase';
import { IDeleteTodoUseCase } from '../../application/delete/IDeleteTodoUseCase';
import { IUpdateTodoUseCase } from '../../application/update/IUpdateTodoUseCase';
import { IReadTodoUseCase } from '../../application/read/IReadTodoUseCase';

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
  ) { this.loadList() }

  async loadList(): Promise<void> {
    this.listLoadingRepository.save(true);

    await this.readUseCase.read();

    this.listLoadingRepository.save(false);
  }

  get todos(): ITodo[] {
    return this.repository.data ?? [];
  }

  async create(todo: ITodoCreate): Promise<void> {
    this.createLoadingRepository.save(true);

    await this.createUseCase.create(todo);

    this.createLoadingRepository.save(false);
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
