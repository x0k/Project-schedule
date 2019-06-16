import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Drawer from '../../components/drawer'

import List from '../../components/list'

import { setDrawer } from '../../store/application'
import { openSchedule } from '../../store/schedules'

import { drawerWidth } from '../../constants'

import { dateTimePeriod } from '../../utils/dateTime'

const useStyle = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  warning: {
    width: '100%'
  }
}))

function Menu ({ application: { drawerOpen, schedule }, setDrawer, schedules, open }) {
  const classes = useStyle()
  const names = schedules.map(({ name, period }) => ({ primary: name, secondary: dateTimePeriod(period) }))
  return (
    <Drawer className={classes.drawer} mobileOpen={drawerOpen} onClose={() => setDrawer(!drawerOpen)}>
      <List items={names} onClick={(schedule, index) => open(index)} selected={schedule} />
      {schedules.length === 0 && <Typography className={classes.warning} align="center" variant="h6">Нет загруженных расписаний</Typography>}
    </Drawer>
  )
}

function mapStateToProps (store) {
  return store
}

function mapDispatchToProps (dispatch) {
  return {
    setDrawer: bindActionCreators(setDrawer, dispatch),
    open: bindActionCreators(openSchedule, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
