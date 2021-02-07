import { IDeleteTodoUseCase } from './IDeleteTodoUseCase';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { IDeleteRequester } from '../_ports/IDeleteRequester';

export class DeleteTodoUseCase implements IDeleteTodoUseCase {
  constructor(
    private loadingRepository: IRepository<Record<string, boolean>>,
    private todoRepository: IRepository<ITodo[]>,
    private deleteRequester: IDeleteRequester,
  ) {}

  getIsLoading(id: string): boolean {
    return this.loadingRepository.data?.[id] ?? false;
  }

  async delete(id: string): Promise<void> {
    const itemLoading = {
      ...this.loadingRepository.data,
      [id]: true,
    };

    this.loadingRepository.save(itemLoading);

    await this.deleteRequester.delete(id);

    const newData = this.todoRepository.data?.filter(it => it.id !== id) ?? null;

    this.todoRepository.save(newData);

    const itemLoaded = {
      ...this.loadingRepository.data,
      [id]: false,
    };

    this.loadingRepository.save(itemLoaded);
  }
}
