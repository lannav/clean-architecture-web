import { ITodoCreate } from '../_models/ITodoCreate';

export interface ICreateTodoUseCase {
  isLoading: boolean;

  create(todo: ITodoCreate): Promise<void>;
}
