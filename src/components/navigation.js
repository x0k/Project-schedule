import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { withStyles } from '@material-ui/core/styles';

import SchedulesList from '../containers/schedulesList';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  darawerHeader: {
    margin: 20,
  },
});

export default withStyles(styles, { withTheme: true })(function ({ classes, theme, open, drawerHandler }) {
  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={drawerHandler}
          classes={{ paper: classes.drawerPaper }}
        >
          <SchedulesList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          open
        >
          <SchedulesList />
        </Drawer>
      </Hidden>
    </nav>
  );
});