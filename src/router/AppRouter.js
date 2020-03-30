import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//@ Components
import Main from '../Components/Main';
import Host from '../Components/Host';
import Remote from '../Components/Remote';
import ErrorPage from '../Components/ErrorPage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <div>
    <Router history={history}>
      <Switch>
        <Route path='/' component={Main} exact={true}></Route>
        <Route path='/host' component={Host}></Route>
        <Route path='/remote' component={Remote}></Route>
        <Route component={ErrorPage}></Route>
      </Switch>
    </Router>
  </div>
);

export default AppRouter;
