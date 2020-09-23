import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Logo from '../../images/Logo.svg'
import { auth } from 'utils/auth';
import { useAuth } from "../../context/auth";

export default function Header() {
    const { logout } = useAuth();
    const classes = useStyles();
    let history = useHistory();
    
    const handleLogOut = () => {
      logout().then(() => {
        auth.isLoggedIn = false
        history.push("/")
      })
    }

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              <img src={Logo} alt="Globe Drop"/> 
            </Typography>
            <nav>
                <Link variant="button" color="textPrimary" href="/users" className={classes.link}>
                User List
                </Link>
                <Link variant="button" color="textPrimary" href="/list" className={classes.link}>
                NGO List
                </Link>
            </nav>
            {auth.isLoggedIn ? (
            <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={() => handleLogOut()}> 
                  Logout
              </Button>
            ) : (
              <Button href="#" color="primary" variant="outlined" className={classes.link}>
               Log In
              </Button>
            )}
           
            <nav>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                FR
                </Link>
            </nav>
            </Toolbar>
        </AppBar>
    )
    
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));