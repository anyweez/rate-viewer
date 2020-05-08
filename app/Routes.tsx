import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';

import App from './containers/App';
import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';
import ParkingPage from './containers/ParkingPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.PARKING} component={ParkingPage} />
      </Switch>
    </App>
  );
}
