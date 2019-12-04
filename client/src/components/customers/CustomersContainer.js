/**
 * Container to hold the bookings feature and assign the trip store to it
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import Customers from './Customers';

const CustomersContainer = inject('store')(
  observer(({ store }) => {
    return (
      <Customers
        customers={store.customers}
        updateCustomer={store.updateCustomer}
        network={store.network}
      />
    );
  }),
);

export default CustomersContainer;
