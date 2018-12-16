import React, { Component } from 'react';

import List, {ListItem, ListItemText, ListItemMeta, ListGroup, ListGroupSubheader} from '@material/react-list';
import '@material/react-list/dist/list.css';

export default class Schedule extends Component {

  state = { groupBy: 'day' };

  render () {
    return (
      <div>
        <ListGroup>
          <ListGroupSubheader tag='h2'>Day - data</ListGroupSubheader>
          <List>
            {this.props.groups.map(el => (
              <ListItem>
                <ListItemText primaryText={JSON.stringify(el.value)} />
                <ListItemMeta meta='place' />
              </ListItem>
            ))}
          </List>
        </ListGroup>
      </div>
    );
  }

}