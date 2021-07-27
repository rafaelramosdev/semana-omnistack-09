import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { New } from './pages/New';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/new" exact component={New} />
      </Switch>
    </BrowserRouter>
  );
}