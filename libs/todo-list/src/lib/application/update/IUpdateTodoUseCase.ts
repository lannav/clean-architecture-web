import { ITodo } from '../_models/ITodo';

export interface IUpdateTodoUseCase {
  update(todo: ITodo): Promise<void>;
}
