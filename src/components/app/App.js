import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Schedule from '../schedule/Schedule';

import { Generator } from 'schedule-generator';
import exams from '../../assets/exams';
import schedule from '../../assets/schedule';

const drawerWidth = 240,
  styles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    darawerHeader: {
      margin: 20,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
  });

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      groups: [],
      mobileOpen: false,
      schedules: [
        { name: '147a schedule', data: schedule, from: new Date(2018, 11, 3), to: new Date(2018, 11, 30), step: 600000 },
        { name: '147 Exams', data: exams, from: new Date(2019, 0, 10), to: new Date(2019, 0, 20), step: 1800000 },
      ]
    };
    this.onSelect(this.state.selectedIndex);
  }

  onSelect = (selectedIndex) => {
    let { data, from, to } = this.state.schedules[selectedIndex],
      gen = new Generator();
    gen.load(data)
      .then(event => gen.run(from, to))
      .then(groups => this.setState({ groups, selectedIndex }));
  }

  drawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  scheduleDates (schedule) {
    let d2s = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return d2s(schedule.from) + ' - ' + d2s(schedule.to);
  }

  render () {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <Typography className={classes.darawerHeader} variant="h5">Schedules</Typography>
        <List>
          {this.state.schedules.map((schedule, scheduleId) => (
            <MenuItem
              key={scheduleId}
              selected={scheduleId === this.state.selectedIndex}
              onClick={event => this.onSelect(scheduleId)}
            >
              <ListItemText
                primary={schedule.name}
                secondary={this.scheduleDates(schedule)}
              />
            </MenuItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.drawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.state.schedules[this.state.selectedIndex].name}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.drawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Schedule name={this.state.schedules[this.state.selectedIndex].name} groups={this.state.groups} step={this.state.schedules[this.state.selectedIndex].step} />
        </main>
      </div>
    );
  }

}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
