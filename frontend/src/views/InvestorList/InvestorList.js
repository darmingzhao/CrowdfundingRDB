import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { InvestorsTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const InvestorList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <InvestorsTable/>
      </div>
    </div>
  );
};

export default InvestorList;
