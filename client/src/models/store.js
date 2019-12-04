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
import Vehicle from './Vehicle';

export default class Store {
  network;

  @observable simulationStarted;

  @observable userToken;

  @observable customers;

  @observable vehicles;

  constructor({ token = null, network, customers = [], vehicles = [] }) {
    this.userToken = token;
    this.network = network;
    this.network.setToken(token);
    this.customers = customers;
    this.vehicles = vehicles;
    this.simulationStarted = false;
    this.client = SocketClient('');
    this.client.on('vehicle-status', async data => {
      const res = await this.network.get(urls.CUSTOMER(data.CustomerId));
      this.updateCustomerVehicle(res.data);
      this.updateVehicle(data);
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
   * get all customers and update current model
   */
  @action.bound
  async setVehicles(data) {
    this.vehicles = data.map(item => new Vehicle({ ...item }));
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
  }

  /**
   * update single vehicle with specified id
   * @param vehicle
   */
  @action.bound
  updateVehicle(vehicle) {
    const index = this.vehicles.findIndex(item => item.id === vehicle.id);
    this.vehicles = [
      ...this.vehicles.slice(0, index),
      new Customer({ ...vehicle }),
      ...this.vehicles.slice(index + 1, this.vehicles.length),
    ];
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
