import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const InvestorsTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [investors, setInvestors] = useState([]);
  const [chosenInvestor, setChosenInvestor] = useState('Select Investor');
  const [investorProjects, setInvestorProjects] = useState([]);
  const [topInvestor, setTopInvestor] = useState('');
  const [starInvestors, setStarInvestors] = useState([]);
  const [topTotal, setTopTotal] = useState(0);

  useEffect(() => {
    getTopInvestor()
    getStarInvestors()
    getAllInvestors()
    getInvestorProjects(chosenInvestor)
  }, [chosenInvestor])

  const handleInvestorChange = (e) => {
    const val = e.target.value
    setChosenInvestor(val)
  }
  const getTopInvestor = () => {
    axios.get('/investor/maximum')
    .then((res) => {
      setTopInvestor(res.data.TopDonation.InvestorUsername)
      setTopTotal(res.data.TopDonation.Total)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const getAllInvestors= () => {
    axios.get('/investor/')
    .then((res) => {
      setInvestors(res.data.Investors)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const getInvestorProjects= (username) => {
    axios.get('/investor/donations', {
      params: {
        InvestorUsername: username
      }
    })
    .then((res) => {
      setInvestorProjects(res.data.Projects)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const getStarInvestors = () => {
    axios.get('/investor/all')
    .then((res) => {
      setStarInvestors(res.data.Investors)
    })
    .catch(err => {
      console.error(err)
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card {...rest}
          className={clsx(classes.root, className)}>
          <Typography align="center" variant="h1">Top Invested Total(<b>{topInvestor}</b>): ${topTotal}</Typography>    
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card {...rest}
          className={clsx(classes.root, className)}>
            <CardContent justify="center" align="center">
              <FormControl className={classes.formControl}>
                <InputLabel id="investor">Select Investor</InputLabel>
                <Select
                  labelId="investor"
                  id="investor-select"
                  value={chosenInvestor}
                  onChange={handleInvestorChange}
                  fullWidth
                >
                  <MenuItem value="Select Investor" disabled>
                    Select Investor
                  </MenuItem>
                  {
                    investors.map(investor => {
                      return <MenuItem value={investor.InvestorUsername}>{investor.InvestorUsername}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={9} alignItems="center">
        <Card {...rest}
          className={clsx(classes.root, className)}>
            <CardContent align="center" justify="center">
                <Typography variant="h2">{(() => {
                if (chosenInvestor !== 'Select Investor') {
                  return `Projects donated to by ${chosenInvestor}`
                } else {
                  return 'Select Investor'
                }
              })()
              }</Typography>
              <List dense={true}>
                {investorProjects.map(project => {
                  return (<ListItem alignItems="center">
                    <ListItemText
                      primary={project.Title}
                    />
                  </ListItem>)
                })}
            </List>
            </CardContent>
          </Card>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={9} alignItems="center">
        <Card {...rest}
          className={clsx(classes.root, className)}>
            <CardContent align="center" justify="center">
              <Typography variant="h2">Investors of All Projects</Typography>
              <List dense={true}>
                {starInvestors.map(investor => {
                  return (<ListItem alignItems="center">
                    <ListItemText
                      primary={investor.InvestorUsername}
                    />
                  </ListItem>)
                })}
            </List>
            </CardContent>
          </Card>
      </Grid>
    </Grid>
  );
};

InvestorsTable.propTypes = {
  className: PropTypes.string
};

export default InvestorsTable;
