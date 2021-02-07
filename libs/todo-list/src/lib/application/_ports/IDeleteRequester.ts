export interface IDeleteRequester {
  delete(id: string): Promise<void>;
}
