export interface IMessagesListPresenter {
  messages: IMessage[];
}

export interface IMessage {
  id: string;
  date: string;
  text: string;
}
