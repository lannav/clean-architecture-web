import { IUpdateTodoUseCase } from './IUpdateTodoUseCase';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { IUpdateRequester } from '../_ports/IUpdateRequester';

export class UpdateTodoUseCase implements IUpdateTodoUseCase {
  constructor(
    private todoRepository: IRepository<ITodo[]>,
    private updateRequester: IUpdateRequester,
  ) {}

  async update(todo: ITodo): Promise<void> {
        const updatedItem = await this.updateRequester.update(todo);

    const newData = this.todoRepository.data?.map(it => it.id === updatedItem.id ? updatedItem : it) ?? null;

    this.todoRepository.save(newData);
  }
}
