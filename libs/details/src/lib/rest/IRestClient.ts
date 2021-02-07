export interface IRestClient {
  get<T>(url: string): Promise<T>
  post<Response, Request = undefined>(url: string, body: Request): Promise<Response>
  put<Response, Request = undefined>(url: string, body: Request): Promise<Response>
  delete(url: string): Promise<void>
}
