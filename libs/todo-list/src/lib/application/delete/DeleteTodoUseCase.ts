import { IDeleteTodoUseCase } from './IDeleteTodoUseCase';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { IDeleteRequester } from '../_ports/IDeleteRequester';

export class DeleteTodoUseCase implements IDeleteTodoUseCase {
  constructor(
    private todoRepository: IRepository<ITodo[]>,
    private deleteRequester: IDeleteRequester,
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteRequester.delete(id);

    const newData = this.todoRepository.data?.filter(it => it.id !== id) ?? null;

    this.todoRepository.save(newData);
  }
}
