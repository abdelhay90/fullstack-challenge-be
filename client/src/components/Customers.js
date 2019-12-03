import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Network from '../common/network';
import { urls } from '../common/constants';

const CustomerList = ({ classes }) => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    function getCustomers(res) {
      setCustomers(res.data);
    }

    new Network().get(urls.CUSTOMERS()).then(getCustomers);
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
              HEllo
            </ExpansionPanelDetails>
            <ExpansionPanelActions>hello</ExpansionPanelActions>
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
