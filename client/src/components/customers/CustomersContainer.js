/**
 * Container to hold the bookings feature and assign the trip store to it
 */
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Typography, AppBar, Tabs, Tab } from '@material-ui/core';
import Customers from './Customers';
import VehiclesWithFilter from './VehiclesWithFilter';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const CustomersContainer = inject('store')(
  observer(({ store }) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <>
        <Typography variant='h6'>Customers</Typography>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            <Tab label='All Customers' {...a11yProps(0)} />
            <Tab label='All Vehicles' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Customers
            customers={store.customers}
            updateCustomer={store.updateCustomer}
            network={store.network}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VehiclesWithFilter
            vehicles={store.vehicles}
            customers={store.customers}
          />
        </TabPanel>
      </>
    );
  }),
);

export default CustomersContainer;
