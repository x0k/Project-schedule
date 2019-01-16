import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

export default withStyles(styles)(function ({ classes, from, to, groupBy, dateHandler, menuHandler }) {
  return (
    <div className={classes.controlPanel}>
      <TextField
        label="From"
        type="date"
        value={from}
        className={classes.textField}
        onChange={dateHandler('from')}
      />
      <TextField
        label="To"
        type="date"
        value={to}
        className={classes.textField}
        onChange={dateHandler('to')}
      />
      <FormControl className={classes.groupBy}>
        <InputLabel shrink htmlFor="group-by-select">
          Age
        </InputLabel>
        <Select
          value={groupBy}
          onChange={menuHandler('groupBy')}
          input={<Input id="group-by-select" />}
        >
          <MenuItem value={'day'}>Day</MenuItem>
          <MenuItem value={'week'}>Week</MenuItem>
          <MenuItem value={'month'}>Month</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});