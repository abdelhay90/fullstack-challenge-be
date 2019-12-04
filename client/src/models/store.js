/**
 * store model to be used as mobx store to be bound as main source of truth in application
 */
import { observable, action } from 'mobx';
import SocketClient from 'socket.io-client';
import {
  simulationIntervalTimeMilliSeconds,
  urls,
  vehicleStatus,
} from '../common/constants';
import Customer from './Customer';
import { getRandomInt } from '../common/utils';

export default class Store {
  network;

  @observable simulationStarted;

  @observable userToken;

  @observable customers;

  constructor({ token = null, network, customers = [] }) {
    this.userToken = token;
    this.network = network;
    this.network.setToken(token);
    this.customers = customers;
    this.simulationStarted = false;
    this.client = SocketClient('');
    this.client.on('vehicle-status', async data => {
      const res = await this.network.get(urls.CUSTOMER(data.CustomerId));
      this.updateCustomerVehicle(res.data);
    });
  }

  /**
   * update customer in customers list
   * @param data
   */
  @action.bound
  updateCustomerVehicle(data) {
    this.updateCustomer(data);
  }

  /**
   * get all customers and update current model
   */
  @action.bound
  async setCustomers(data) {
    this.customers = data.map(item => new Customer({ ...item }));
  }

  /**
   * update single customer with specified id
   * @param customer
   */
  @action.bound
  updateCustomer(customer) {
    const index = this.customers.findIndex(item => item.id === customer.id);
    console.log(
      this.customers.slice(0, index),
      index,
      this.customers.slice(index + 1, this.customers.length),
    );
    this.customers = [
      ...this.customers.slice(0, index),
      new Customer({ ...customer }),
      ...this.customers.slice(index + 1, this.customers.length),
    ];
    console.log(this.customers, this.customers.length);
  }

  /**
   * update user token
   * @param token
   */
  @action.bound
  updateUserToken(token) {
    this.userToken = token;
    this.network.setToken(token);
  }

  /**
   * start simulation of vehicle status update
   */
  startSimulation() {
    this.simulationStarted = true;
    const statusValues = Object.values(vehicleStatus);
    const interval = setInterval(() => {
      if (!this.simulationStarted) {
        clearInterval(interval);
      }
      const customer = this.customers[
        getRandomInt(0, this.customers.length - 1)
      ];
      const vehicle =
        customer.Vehicles[getRandomInt(0, customer.Vehicles.length - 1)];
      if (vehicle) {
        this.network.put(urls.VEHICLE(vehicle.id), {
          status: statusValues[getRandomInt(0, statusValues.length - 1)],
        });
      }
    }, simulationIntervalTimeMilliSeconds);
  }

  /**
   * stop simulation of vehicle status updates
   */
  stopSimulation() {
    this.simulationStarted = false;
  }
}
