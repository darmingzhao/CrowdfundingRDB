import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Store
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  
  /* STATE */
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/project/ongoing/')
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.error(err);
    })
  })
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
        >
          <p>{data}</p>
          
          <Store />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
