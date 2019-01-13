import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Bar from './bar';
import Navigation from './navigation';
import Schedule from './schedule';

import exams from '../assets/exams';

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

class App extends Component {

  state = {
    selectedIndex: 0,
    mobileOpen: false,
    schedules: [
      { name: '147 Exams', data: exams, from: new Date(2019, 0, 10), to: new Date(2019, 0, 20) }
    ]
  }

  onSelect = (selectedIndex) => () => this.setState({ selectedIndex });

  drawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  scheduleDates (schedule) {
    let d2s = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return d2s(schedule.from) + ' - ' + d2s(schedule.to);
  }

  render () {
    const { classes } = this.props;
    const { schedules, selectedIndex, mobileOpen } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Bar
          title={schedules[selectedIndex].name}
          drawerHandler={this.drawerToggle}
        />
        <Navigation
          open={mobileOpen}
          schedules={schedules}
          selected={selectedIndex}
          onSelect={this.onSelect}
          drawerHandler={this.drawerToggle}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Schedule schedule={schedules[selectedIndex]} />
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
