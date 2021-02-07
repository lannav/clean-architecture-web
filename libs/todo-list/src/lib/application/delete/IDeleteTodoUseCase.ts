export interface IDeleteTodoUseCase {
  getIsLoading(id: string): boolean;
  delete(id: string): Promise<void>;
}
