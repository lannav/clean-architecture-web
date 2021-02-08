export interface IDeleteTodoUseCase {
  delete(id: string): Promise<void>;
}
