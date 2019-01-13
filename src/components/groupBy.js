import React, { Component } from 'react';

import Select from '@material/react-select';
import '@material/react-select/dist/select.css';

import './GroupBySelect.scss';

export default class GroupBySelect extends Component {

  render () {
    const options = [{
      label: 'Day',
      value: 'day',
    }, {
      label: 'Week',
      value: 'week',
    }];
    return (
      <Select
        className='select-width'
        label='Group By'
        onChange={e => {
          if (this.props.onSelect) {
            this.props.onSelect(e.target.value);
          }
        }}
        options={options}
      />
    );
  }

}