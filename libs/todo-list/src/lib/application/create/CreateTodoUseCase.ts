import { ICreateTodoUseCase } from './ICreateTodoUseCase';
import { ITodoCreate } from '../_models/ITodoCreate';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { ICreateRequester } from '../_ports/ICreateRequester';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(
    private loadingRepository: IRepository<boolean>,
    private todoRepository: IRepository<ITodo[]>,
    private createRequester: ICreateRequester,
  ) {}

  get isLoading(): boolean {
    return this.loadingRepository.data ?? false;
  }

  async create(todo: ITodoCreate): Promise<void> {
    this.loadingRepository.save(true);

    this.todoRepository.save([
      ...(this.todoRepository.data ?? []),
      await this.createRequester.create(todo),
    ]);

    console.log('create', this.todoRepository.data);

    this.loadingRepository.save(false);
  }
}
