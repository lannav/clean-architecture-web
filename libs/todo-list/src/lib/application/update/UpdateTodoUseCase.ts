import { IUpdateTodoUseCase } from './IUpdateTodoUseCase';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { IUpdateRequester } from '../_ports/IUpdateRequester';

export class UpdateTodoUseCase implements IUpdateTodoUseCase {
  constructor(
    private loadingRepository: IRepository<Record<string, boolean>>,
    private todoRepository: IRepository<ITodo[]>,
    private updateRequester: IUpdateRequester,
  ) {}

  getIsLoading(id: string): boolean {
    return this.loadingRepository.data?.[id] ?? false;
  }

  async update(todo: ITodo): Promise<void> {
    const itemLoading = {
      ...this.loadingRepository.data,
      [todo.id]: true,
    };

    this.loadingRepository.save(itemLoading);

    const updatedItem = await this.updateRequester.update(todo);

    const newData = this.todoRepository.data?.map(it => it.id === updatedItem.id ? updatedItem : it) ?? null;

    this.todoRepository.save(newData);

    const itemLoaded = {
      ...this.loadingRepository.data,
      [todo.id]: false,
    };

    this.loadingRepository.save(itemLoaded);
  }
}
