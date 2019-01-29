import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Bar from '../containers/topBar';
import Navigation from '../containers/leftBar';
import Schedule from '../containers/scheduleContainer';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

export default withStyles(styles, { withTheme: true })(function ({ classes, selectedSchedule }) {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Bar />
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {selectedSchedule >= 0 &&
          <Schedule id={selectedSchedule} />
        }
      </main>
    </div>
  );
});
