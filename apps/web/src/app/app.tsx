import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { TodoList } from '@clean/todo-list';
import { MessagesList } from '@clean/chat';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">TODO</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/todo">
            <TodoList />
          </Route>
          <Route path="/chat">
            <MessagesList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
