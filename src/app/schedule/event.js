import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'

import { dateTimePeriod } from '../../utils/dateTime'

export default function Event ({ period, value, fields }) {
  return (
    <div>
      {dateTimePeriod(period)}
    </div>
  )
}
