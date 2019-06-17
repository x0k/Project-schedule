import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { buildIterator, buildGenerator, grouper } from 'eventa'

import { open, selectSchedule } from '../../store/application'
import { GridList, GridListTile, Typography } from '@material-ui/core'
import { dateTimePeriod } from '../../utils/dateTime'

const useStyles = makeStyles({
  title: {
    marginTop: 10
  }
})

function build ({ period: { start, end }, constraints, rules }) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const keys = rules.map(({ id }) => id)

  const iterator = buildIterator(startDate, endDate, constraints)

  const gen = buildGenerator(rules, iterator, item => keys.every(key => item[key]))

  const separator = (step) => ({ value, period: { end } }, current) =>
    keys.every(key => value[key] === current[key]) && (end + step === current.milliseconds)

  return grouper(gen, constraints, separator)
}

function Schedule ({ schedule, open, select, index, application: { schedule: selected } }) {
  const [calculated, setCalculated] = useState(null)
  useEffect(() => {
    if (!schedule) {
      select(-1)
      open('/')
    } else {
      const idx = Number(index)
      if (selected !== idx) {
        select(idx)
      }
      if (!calculated) {
        const groups = build(schedule)
        setCalculated([...groups])
      }
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
