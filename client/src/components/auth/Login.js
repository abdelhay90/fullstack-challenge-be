/**
 * login component enable user to login with his credentials
 */
import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Error from '../common/Error';

const Login = ({ classes, auth, store }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setError(null);
      setLoading(true);

      // login with current form credentials
      await auth.login({ username, password });

      setLoading(false);

      // return to home after successful login
      auth.history.push('/');

      // get customers from api
      store.getCustomers();
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={event => handleSubmit(event)}>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='username'>Username</InputLabel>
            <Input
              id='username'
              onChange={event => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              id='password'
              type='password'
              onChange={event => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={loading || !username.trim() || !password.trim()}
            className={classes.submit}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {/* Error Handling */}
          {error && <Error error={error} />}
        </form>
      </Paper>
    </div>
  );
};

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

export default inject('store')(withStyles(styles)(Login));
