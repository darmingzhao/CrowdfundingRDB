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
    axios.get('/project/ongoing',{
      params: {
        NumInvestors: numInvestors || 0
      }
    })
    .then(res => {
      setData(res.data.projects)
    })
    .catch(err => {
      console.error(err);
    })
  }
  const updateProjects = function () {
    axios.put('/project/ongoing', {
        NumInvestors: numAddInvestors
    }).catch(err => {
      console.error(err);
    })
  }

  const handleSearch = function (e) {
    e.persist();
    getProjects(numInvestors)
  }

  const handleUpdate = function (e) {
    e.persist();
    updateProjects()
  }

  const handleSearchInput = function (e) {
    const val = e.target.value
    setNumInvestors(val)
  }

  const handleAddInput = function (e) {
    const val = e.target.value
    addNumInvestors(val)
  }
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
                onChange={handleSearchInput}
                fullWidth
              />
              </Grid>
              <Grid item xs={2}>
                <Button color="primary" onClick={handleSearch}>Search</Button>
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
                onChange={handleAddInput}
              />
              </Grid>
              <Grid item xs={2}>
                <Button color="primary" onClick={handleUpdate}>Update</Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
          {data.map(store => {
            return (<Grid
              item
              lg={6}
              key={store.Title}
            >
              <Store title={store.Title} description={store.Description} goal={store.Goal} num_investors={store.NumInvestors} organizer_email={store.OrganizerEmail} project_id={store.ProjectID} />
            </Grid>)
          })}
      </Grid>
    </div>
  );
};

export default Dashboard;
