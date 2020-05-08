import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';

import App from './containers/App';
import HomePage from './containers/HomePage';
import ParkingPage from './containers/ParkingPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.PARKING} component={ParkingPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
