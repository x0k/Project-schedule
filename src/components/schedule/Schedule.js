import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List, {ListItem, ListItemText, ListItemMeta, ListGroup, ListGroupSubheader} from '@material/react-list';
import '@material/react-list/dist/list.css';

import { Grouper } from 'schedule-generator';

export default class Schedule extends Component {

  constructor (props) {
    super(props);
    this.state = { groupBy: 'day', groups: [], name: '' };
  }

  render () {
    console.log(this.props.name);
    if (this.props.groups.length && this.props.name !== this.state.name) {
      let { step, groups, name } = this.props;
      Grouper.toList(step, groups, true)
        .then(list => Grouper.groupBy('day', list))
        .then(groups => this.setState({ groups, name }));
    }
    let items = [];
    for (let group of this.state.groups) {
      items.push(<ListGroupSubheader tag='h2'>{group.start}</ListGroupSubheader>);
      items.push(
        <List>
          {group.items.map(el => (
            <ListItem>
              <ListItemText primaryText={JSON.stringify(el.value)} />
              <ListItemMeta meta='place' />
            </ListItem>
          ))}
        </List>
      );
    }
    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }

}

Schedule.propTypes = {
  name: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  groups: PropTypes.array.isRequired
};