import { IReadTodoUseCase } from './IReadTodoUseCase';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { IReadRequester } from '../_ports/IReadRequester';

export class ReadTodoUseCase implements IReadTodoUseCase {
  constructor(
    private loadingRepository: IRepository<boolean>,
    private todoRepository: IRepository<ITodo[]>,
    private readRequester: IReadRequester,
  ) { this.read() }

  get isLoading(): boolean {
    return this.loadingRepository.data ?? false;
  }

  async read(): Promise<void> {
    this.loadingRepository.save(true);

    this.todoRepository.save(await this.readRequester.read());

    this.loadingRepository.save(false);
  }
}
