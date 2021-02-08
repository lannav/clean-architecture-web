import React from 'react';
import { connector, Factory } from '../config/Factory';
import { MessagesList as List } from './messages-list';

export const MessagesList: React.FC = () => (
  <connector.Provider useCases={Factory.useCases}>
    <List />
  </connector.Provider>
);
