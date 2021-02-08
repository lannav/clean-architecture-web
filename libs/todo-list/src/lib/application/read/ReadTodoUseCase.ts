import { IReadTodoUseCase } from './IReadTodoUseCase';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { IReadRequester } from '../_ports/IReadRequester';

export class ReadTodoUseCase implements IReadTodoUseCase {
  constructor(
    private todoRepository: IRepository<ITodo[]>,
    private readRequester: IReadRequester,
  ) {}

  async read(): Promise<void> {
    this.todoRepository.save(await this.readRequester.read());
  }
}
