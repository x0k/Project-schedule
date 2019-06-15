import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppBar from '../../components/appBar'

import { setDrawer } from '../../store/application'

import { drawerWidth } from '../../constants'

const useStyle = makeStyles(theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))

function Bar ({ drawerOpen, setDrawer }) {
  const classes = useStyle()
  return (
    <AppBar className={classes.appBar}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        edge="start"
        onClick={() => setDrawer(!drawerOpen)}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    </AppBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bar)
