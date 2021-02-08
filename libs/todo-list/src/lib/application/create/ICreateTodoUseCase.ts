import { ITodoCreate } from '../_models/ITodoCreate';

export interface ICreateTodoUseCase {
  create(todo: ITodoCreate): Promise<void>;
}
