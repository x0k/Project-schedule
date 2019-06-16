import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default function SimpleList ({ primary, secondary, onClick, selected }) {
  return (
    <ListItem button key={primary} onClick={onClick} selected={selected}>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  )
}
