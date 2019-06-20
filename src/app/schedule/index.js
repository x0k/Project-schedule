import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { open, selectSchedule } from '../../store/application'
import { GridList, GridListTile, Typography } from '@material-ui/core'
import { dateTimePeriod } from '../../utils/dateTime'

import calculate from '../../workers/calculate'

const useStyles = makeStyles({
  title: {
    marginTop: 10
  }
})

function Schedule ({ schedule, open }) {
  const [calculated, setCalculated] = useState(null)
  useEffect(() => {
    if (!schedule) {
      open('/')
    } else if (!calculated) {
      calculate(schedule)
        .then(setCalculated)
    }
  })
  const classes = useStyles()
  if (!calculated) {
    return <LinearProgress />
  }
  const { fields } = schedule
  return (
    calculated.map(({ period, value }) => (
      <div>
        <Typography variant="h6" className={classes.title}>{dateTimePeriod(period)}</Typography>
        <GridList cellHeight={54} cols={2}>
          {fields.map(field => (
            <GridListTile>
              <Typography color="textSecondary">{field}</Typography>
              <Typography>{value[field]}</Typography>
            </GridListTile>
          ))}
        </GridList>
      </div>
    ))
  )
}

function mapStateToProps ({ schedules, application }, { match: { params: { schedule } } }) {
  return { schedule: schedules[schedule], index: schedule, application }
}

function mapDispatchToProps (dispatch) {
  return {
    open: bindActionCreators(open, dispatch),
    select: bindActionCreators(selectSchedule, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
