import { ITodo } from '../../../application/_models/ITodo';
import { ITodoListPresenter } from '../../../presenter/todo-list/ITodoListPresenter';

export interface IPropsTodoItem extends ITodo {
  todoListPresenter: ITodoListPresenter;
}
