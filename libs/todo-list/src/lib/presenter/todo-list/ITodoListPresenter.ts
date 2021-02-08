import { ITodoCreate } from '../../application/_models/ITodoCreate';
import { ITodoPreview } from './ITodoPreview';

export interface ITodoListPresenter {
  todos: ITodoPreview[];
  isListLoading: boolean;
  isCreateLoading: boolean;

  isItemLoading(id: string): boolean;
  create(todo: ITodoCreate): void;
  createCurrency(): void;
  delete(id: string): void;
  onCheck(id: string): void;
}
