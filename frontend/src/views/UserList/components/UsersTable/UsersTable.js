import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Grid,
  Button,
  Dialog,
  DialogTitle
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

const UsersTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [radio, setRadio] = useState('email')
  const [organizers, setOrganizers] = useState([]);
  const [numOrganizers, setNumOrganizers] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getOrganizers()
    getNumOrganizers()
  }, [radio, numOrganizers, open])

  const getNumOrganizers = () => {
    axios.get('/organizer')
    .then((res) => {
      setNumOrganizers(res.data.organizers.Count)
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

  const deleteHandler = (email) => {
    axios.delete('/organizer/', {
      data: {
        OrganizerEmail: email
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const radioGroupHandler = (e) => {
    const val = e.target.value;
    setRadio(val)
  }
  const onEmail = radio === 'OrganizerEmail';
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
          <Grid item align="left" xs={3}>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position" defaultValue="email" onChange={radioGroupHandler}>
                <FormControlLabel
                  value="OrganizerEmail"
                  control={<Radio color="primary" />}
                  label="Email"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="Name"
                  control={<Radio color="primary" />}
                  label="Name"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="Phone"
                  control={<Radio color="primary" />}
                  label="Phone"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={6}></Grid>
          <Grid item align="center" xs={3} m={4}>
            <Button color="secondary" onClick={handleClickOpen}>Get Num. Organizers</Button>
          </Grid>
        </Grid>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Delete</TableCell>
                  {(() => {
                    if (radio === 'Name') {
                      return <TableCell align="left">Name</TableCell>
                    }
                    if (radio === 'OrganizerEmail') {
                      return <TableCell align="left">Email</TableCell>
                    }
                    if (radio === 'Phone') {
                      return <TableCell align="left">Phone</TableCell>
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
                    <TableCell align="left">
                      <Button color="primary" onClick={() => {deleteHandler(organizer.OrganizerEmail)}} disabled={!onEmail}>Delete</Button>
                    </TableCell>
                    <TableCell align="left">
                      {organizer.OrganizerEmail || organizer.Name || organizer.Phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
        <Dialog open={open} onClose={handleClose} aria-labelledby="num_organizers">
          <DialogTitle id="num_organizers" align="center"><b>{numOrganizers}</b> Total Organizers</DialogTitle>
        </Dialog>
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
