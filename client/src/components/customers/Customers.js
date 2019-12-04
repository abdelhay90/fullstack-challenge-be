/**
 * customers component list that shows all customer with associated vehicles data
 */

import React from 'react';
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
import Vehicles from './Vehicles';
import { urls } from '../../common/constants';

const CustomerList = ({ classes, customers, updateCustomer, network }) => {
  const handleRefreshCustomer = async id => {
    const res = await network.get(urls.CUSTOMER(id));
    updateCustomer(res.data);
  };
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
                  onClick={() => {
                    handleRefreshCustomer(customer.id);
                  }}
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
