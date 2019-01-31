import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { grouperPeriods } from '../scheduleActions';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  controlPanel: {
    display: 'flex'
  },
  textField: {
    marginLeft: 8,
    marginRight: 8,
    width: 160,
  },
  groupBy: {
    marginLeft: 'auto'
  }
};

export default withStyles(styles)(function ({ classes, schedule, from, to, groupBy, beginDateHandler, endDateHandler, menuHandler }) {
  return (
    <div className={classes.controlPanel}>
      <TextField
        label="From"
        type="date"
        value={from}
        className={classes.textField}
        onChange={beginDateHandler(schedule)}
      />
      <TextField
        label="To"
        type="date"
        value={to}
        className={classes.textField}
        onChange={endDateHandler(schedule)}
      />
      <FormControl className={classes.groupBy}>
        <InputLabel shrink htmlFor="group-by-select">
          Age
        </InputLabel>
        <Select
          value={groupBy}
          onChange={menuHandler(schedule)}
          input={<Input id="group-by-select" />}
        >
          {Object.keys(grouperPeriods).map(key => (
            <MenuItem key={key} value={grouperPeriods[key]}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});