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
  ) {}

  get todos(): ITodo[] {
    return this.repository.data ?? [];
  }

  create(todo: ITodoCreate): void {
    this.createUseCase.create(todo);
  }

  delete(id: string): void {
    this.deleteUseCase.delete(id);
  }

  onCheck(id: string): void {
    const currentItem = this.repository.data?.find(it => it.id === id);

    if (currentItem) {
      this.updateUseCase.update({
        ...currentItem,
        checked: !currentItem.checked,
      });
    }
  }

  get isCreateLoading(): boolean {
    return this.createUseCase.isLoading;
  }

  get isListLoading(): boolean {
    return this.readUseCase.isLoading;
  }

  isItemLoading(id: string): boolean {
    return this.updateUseCase.getIsLoading(id) || this.deleteUseCase.getIsLoading(id);
  }
}
