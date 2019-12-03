import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Header = ({ classes, auth }) => {
  const handleLogin = () => {
    if (auth.isAuthenticated()) {
      auth.logout();
    } else {
      auth.history.push('/login');
    }
  };
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        {/* Title / Logo */}
        <Link to='/' className={classes.grow}>
          <Typography variant='h5' color='secondary' noWrap>
            Customers
          </Typography>
        </Link>

        {/* Sign out button */}
        <Button onClick={() => handleLogin()}>
          <Typography
            className={classes.buttonText}
            variant='body1'
            color='secondary'
          >
            {auth.isAuthenticated() ? 'Logout' : 'Login'}
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    marginRight: theme.spacing(1),
    fontSize: 45,
  },
  faceIcon: {
    marginRight: theme.spacing(1),
    fontSize: 30,
    color: 'white',
  },
  username: {
    color: 'white',
    fontSize: 30,
  },
  buttonIcon: {
    marginLeft: '5px',
  },
});

export default withStyles(styles)(Header);
