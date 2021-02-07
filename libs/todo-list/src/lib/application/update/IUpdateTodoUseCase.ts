import { ITodo } from '../_models/ITodo';

export interface IUpdateTodoUseCase {
  getIsLoading(id: string): boolean;
  update(todo: ITodo): Promise<void>;
}
