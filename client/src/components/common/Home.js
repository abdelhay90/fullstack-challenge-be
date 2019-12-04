/**
 * home component with links to main routes in application
 */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import Simulator from './Simulator';

const Home = ({ classes, auth }) => {
  return (
    <div className={classes.container}>
      <h1>Home</h1>
      <>
        {auth.isAuthenticated() ? (
          <>
            <Link to='/customers'>View Customers</Link>
            <Simulator />
          </>
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
