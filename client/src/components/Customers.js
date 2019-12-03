import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Fab,
  Tooltip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RefreshIcon from '@material-ui/icons/Refresh';
import Network from '../common/network';
import { urls } from '../common/constants';
import Vehicles from './Vehicles';

const CustomerList = ({ classes }) => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    function getCustomers(res) {
      setCustomers(res.data);
    }

    if (customers.length === 0)
      new Network().get(urls.CUSTOMERS()).then(getCustomers);
    return function() {};
  });
  return (
    <div className={classes.container}>
      <List>
        {customers.map(customer => (
          <ExpansionPanel key={customer.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ListItem className={classes.root}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'primary',
                  }}
                  primary={customer.name}
                  secondary={customer.address}
                />
              </ListItem>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <Vehicles vehicles={customer.Vehicles} />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Tooltip title='Refresh Vehicles Status' aria-label='add'>
                <Fab
                  size='small'
                  aria-label='Refresh Vehicles Status'
                  color='primary'
                  onClick={() => {}}
                >
                  <RefreshIcon />
                </Fab>
              </Tooltip>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
      </List>
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing(2),
  },
  details: {
    alignItems: 'center',
  },
  link: {
    color: '#424242',
    textDecoration: 'none',
    '&:hover': {
      color: 'black',
    },
  },
});

export default withStyles(styles)(CustomerList);
