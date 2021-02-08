import React from 'react';
import { IPropsMessagesList } from './types';


export const MessagesList: React.FC<IPropsMessagesList> = ({ messagesPresenter }) => (
  <>
    {
      messagesPresenter.messages.map(it => (
        <>
          <div>
            { it.date }
          </div>
          <div>
            { it.text }
          </div>
        </>
      ))
    }
  </>
);
