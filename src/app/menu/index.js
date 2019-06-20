import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Drawer from '../../components/drawer'

import List from '../../components/list'

import { setDrawer, openSchedule } from '../../store/application'

import { drawerWidth } from '../../constants'

import { dateTimePeriod } from '../../utils/dateTime'

const useStyle = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }
}))

const useTitleStyles = makeStyles(theme => ({
  title: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 18
  }
}))

function Title ({ children }) {
  const classes = useTitleStyles()
  return (
    <div className={classes.title}>
      <Typography variant="h6">
        {children}
      </Typography>
    </div>
  )
}

function Menu ({ application: { drawerOpen, schedule }, setDrawer, schedules, open }) {
  const classes = useStyle()
  const names = schedules.map(({ name, period }) => ({ primary: name, secondary: dateTimePeriod(period) }))
  return (
    <Drawer className={classes.drawer} mobileOpen={drawerOpen} onClose={() => setDrawer(!drawerOpen)}>
      <Title>{ schedules.length ? 'Расписания' : 'Нет загруженных расписаний' }</Title>
      <List items={names} onClick={(schedule, index) => open(index)} selected={schedule} />
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
