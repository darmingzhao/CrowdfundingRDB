import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, TextField, Button } from '@material-ui/core';

import {
  Store
} from './components';
import { flexbox } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    display: 'flex',
    

  }
}));

const Dashboard = () => {
  const classes = useStyles();
  
  /* STATE */
  const [data, setData] = useState([]);
  const [numInvestors, setNumInvestors] = useState(0);
  const [numAddInvestors, addNumInvestors] = useState(0);

  const getProjects = function (numInvestors) {
    axios.get('/project/ongoing', {
      NumInvestors: numInvestors
    })
    .then(res => {
      setData(res.data.projects)
    })
    .catch(err => {
      console.error(err);
    })
  }
  const updateProjects = function (numInvestors) {
    axios.put('/project/ongoing', {
      NumInvestors: numAddInvestors
    })
    .catch(err => {
      console.error(err);
    })
  }
  useEffect(() => {
    const stores = [{
      name: "My store",
      description: "my cool store"
    },
    {
      name: "Cool store",
      description: "my sick store"
    },
    {
      name: "His store",
      description: "his sick store"
    }]
    setData(stores, [])
  }, [])

  return (
    <div className={classes.root}>
      
      
      <Grid
        container
        spacing={4}
      >
        <Grid item xs={6}>
          <Card>
          <Grid container 
              alignItems="center"
              justify="center" 
              spacing={1}>
              <Grid item xs={10} p={2}>
            <TextField
                autoFocus
                id="numInvestors"
                label="Number of investors"
                type="number"
                onChange={val => { setNumInvestors(val)}}
                fullWidth
              />
              </Grid>
              <Grid item xs={2}>
                <Button color="primary" onClick={getProjects(numInvestors)}>Search</Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Grid container 
              alignItems="center"
              justify="center" 
              spacing={1}>
              <Grid item xs={10} p={2}>
              <TextField
                autoFocus
                id="addInvestors"
                label="Update Number of Investors"
                type="number"
                fullWidth
                onChange={val => { addNumInvestors(val)}}
              />
              </Grid>
              <Grid item xs={2}>
              <Button color="primary" onClick={updateProjects(numInvestors)}>Update</Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
          {data.map(store => {
            return (<Grid
              item
              lg={6}
              key={store.name}
            >
              <Store name={store.name} description={store.description} />
            </Grid>)
          })}
      </Grid>
    </div>
  );
};

export default Dashboard;
