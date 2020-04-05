import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid
} from '@material-ui/core';

import { getInitials } from 'helpers';

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

const UsersTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [radio, setRadio] = useState('email')
  const [organizers, setOrganizers] = useState([]);
  const [numOrganizers, setNumOrganizers] = useState(0);

  useEffect(() => {
    getOrganizers()
    getNumOrganizers()
  }, [radio, numOrganizers])

  const getNumOrganizers = () => {
    axios.get('/organizer')
    .then((res) => {
      console.log(res.data.organizers)
      setNumOrganizers(res.data.organizers)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const getOrganizers = () => {
    axios.get('/organizer/details', {
      params: {
        Select: radio
      }
    })
    .then((res) => {
      setOrganizers(res.data.details)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const radioGroupHandler = (e) => {
    const val = e.target.value;
    setRadio(val)
  }
  const onEmail = radio === 'email';
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Grid container 
              alignItems="center"
              justify="center" 
              spacing={1}>
          <Grid item align="left" xs={8}>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position" defaultValue="email" onChange={radioGroupHandler}>
                <FormControlLabel
                  value="email"
                  control={<Radio color="primary" />}
                  label="Email"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="name"
                  control={<Radio color="primary" />}
                  label="Name"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="phone"
                  control={<Radio color="primary" />}
                  label="Phone"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item align="left" xs={2} m={4} p={4}>
            <Card><Typography>Organizers</Typography></Card>
          </Grid>
          <Grid item align="left" xs={2} m={4} p={4}>
          <Card><Typography>Organizers</Typography></Card>
          </Grid>
        </Grid>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {(() => {
                    if (radio === 'name') {
                      return <TableCell align="center">Name</TableCell>
                    }
                    if (radio === 'email') {
                      return <TableCell align="center">Email</TableCell>
                    }
                    if (radio === 'phone') {
                      return <TableCell align="center">Phone</TableCell>
                    }
                  })()}
                </TableRow>
              </TableHead>
              <TableBody>
                {organizers.slice(0, rowsPerPage).map(organizer => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={organizer.OrganizerEmail || organizer.Name || organizer.Phone}
                  >
                    <TableCell align="center">
                      {organizer.OrganizerEmail || organizer.Name || organizer.Phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={organizers.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string
};

export default UsersTable;
