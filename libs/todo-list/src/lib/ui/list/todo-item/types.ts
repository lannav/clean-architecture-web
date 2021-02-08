import { ITodoListPresenter } from '../../../presenter/todo-list/ITodoListPresenter';
import { ITodoPreview } from '../../../presenter/todo-list/ITodoPreview';

export interface IPropsTodoItem extends ITodoPreview {
  todoListPresenter: ITodoListPresenter;
}
