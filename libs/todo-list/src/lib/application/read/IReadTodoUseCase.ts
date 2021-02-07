export interface IReadTodoUseCase {
  isLoading: boolean;

  read(): Promise<void>;
}
