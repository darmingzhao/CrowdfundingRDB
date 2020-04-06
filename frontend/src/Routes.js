import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout} from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  InvestorList as InvestorListView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/projects"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/projects"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/organizers"
      />
      <RouteWithLayout
        component={InvestorListView}
        exact
        layout={MainLayout}
        path="/investors"
      />
    </Switch>
  );
};

export default Routes;
