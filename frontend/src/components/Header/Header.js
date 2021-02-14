import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#ffffff',
  },
  logoLink: {
    color: '#ffffff',
  },
  hide: {
    display: 'none',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export const Header = ({ isLoggedIn, logout, children }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    if (isLoggedIn) {
      setOpenDrawer(true);
    }
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.logoLink}>
            <Typography variant="h6" className={classes.title} noWrap>
              Tx Mgmt
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/transactions/new?type=income" onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Add Income" />
            </ListItem>
          </Link>
          <Link to="/transactions?filterType=income" onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
              <ListItemText primary="Income" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/transactions/new?type=expense" onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Add Expense" />
            </ListItem>
          </Link>
          <Link to="/transactions?filterType=expense" onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon><PaymentIcon /></ListItemIcon>
              <ListItemText primary="Expense" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List onClick={() => {
          handleDrawerClose();
          logout(history)
        }} >
            <ListItem button key="Logout" >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>);
}