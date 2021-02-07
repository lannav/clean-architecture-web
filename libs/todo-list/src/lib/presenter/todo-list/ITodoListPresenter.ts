import { ITodo } from '../../application/_models/ITodo';
import { ITodoCreate } from '../../application/_models/ITodoCreate';

export interface ITodoListPresenter {
  todos: ITodo[];
  isListLoading: boolean;
  isCreateLoading: boolean;

  isItemLoading(id: string): boolean;
  create(todo: ITodoCreate): void;
  delete(id: string): void;
  onCheck(id: string): void;
}
