import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { open, selectSchedule } from '../../store/application'

const useStyles = makeStyles({

})

function Schedule ({ schedule, open, select, index }) {
  const classes = useStyles()
  useEffect(() => {
    if (!schedule) {
      select(-1)
      open('/')
    } else {
      select(Number(index))
    }
  })
  if (!schedule) {
    return <LinearProgress />
  }
  return (
    <div className={classes.root}>
      {name}
    </div>
  )
}

function mapStateToProps ({ schedules }, { match: { params: { schedule } } }) {
  return { schedule: schedules[schedule], index: schedule }
}

function mapDispatchToProps (dispatch) {
  return {
    open: bindActionCreators(open, dispatch),
    select: bindActionCreators(selectSchedule, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
