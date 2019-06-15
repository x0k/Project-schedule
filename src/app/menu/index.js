import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Drawer from '../../components/drawer'

import { setDrawer } from '../../store/application'

import { drawerWidth } from '../../constants'

const useStyle = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }
}))

function Menu ({ drawerOpen, setDrawer }) {
  const classes = useStyle()
  return (
    <Drawer className={classes.drawer} mobileOpen={drawerOpen} onClose={() => setDrawer(!drawerOpen)}>
    123
    </Drawer>
  )
}

function mapStateToProps ({ application }) {
  return application
}

function mapDispatchToProps (dispatch) {
  return {
    setDrawer: bindActionCreators(setDrawer, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
