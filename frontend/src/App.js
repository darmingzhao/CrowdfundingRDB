import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import axios from 'axios';

import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  constructor (props) {
    super (props);
    axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1'
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
