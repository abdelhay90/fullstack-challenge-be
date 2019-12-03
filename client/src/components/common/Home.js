import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

const Home = ({ classes, auth }) => {
  return (
    <div className={classes.container}>
      <h1>Home</h1>
      <>
        {auth.isAuthenticated() ? (
          <Link to='/customers'>View Customers</Link>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

const styles = theme => ({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing(2),
  },
});
export default withStyles(styles)(Home);
