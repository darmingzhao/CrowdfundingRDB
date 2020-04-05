import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions, Card, CardContent, Grid, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Store = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const donateHandler = () => {
    axios.post('/donation/', {
      InvestorUsername: 'investorsun',
      ProjectID: props.project_id,
      Amount: amount,
      Message: message
    })
    .then(() => handleClose())
    .catch(err => {
      handleClose()
      console.error(err)
    })
  }
  
  const messageHandler = (e) => {
    const val = e.target.value;
    setMessage(val);
  }

  const amountHandler = (e) => {
    const val = e.target.value;
    setAmount(val);
  }
  const classes = useStyles();
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
            </Typography>
            <Typography variant="h2">{props.title}</Typography>
            <Typography>{props.organizer_email}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" align="right">${props.goal}</Typography>
            <Typography align="right">{props.num_investors} investors </Typography>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            {props.description}
          </Typography>
          <Grid>
            <Button color="primary" onClick={handleClickOpen}>Donate</Button>
          </Grid>
        </div>
      </CardContent>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Donation towards '{props.title}'</DialogTitle>
        <DialogContent justify="center">
          <DialogContentText align="center">
            {props.description}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message to the project organizer"
            variant="outlined"
            height="200px"
            multiline={true}
            onChange={messageHandler}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="donation"
            label="Donation amount"
            type="number"
            onChange={amountHandler}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={donateHandler} color="primary">
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Store.propTypes = {
  className: PropTypes.string
};

export default Store;
