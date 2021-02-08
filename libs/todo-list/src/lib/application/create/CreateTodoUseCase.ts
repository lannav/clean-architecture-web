import { ICreateTodoUseCase } from './ICreateTodoUseCase';
import { ITodoCreate } from '../_models/ITodoCreate';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { ICreateRequester } from '../_ports/ICreateRequester';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(
    private todoRepository: IRepository<ITodo[]>,
    private createRequester: ICreateRequester,
  ) {}

  async create(todo: ITodoCreate): Promise<void> {
    this.todoRepository.save([
      ...(this.todoRepository.data ?? []),
      await this.createRequester.create(todo),
    ]);
  }
}
