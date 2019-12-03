import { observable, action } from 'mobx';
import Network from '../common/network';
import { urls } from '../common/constants';
import Customer from './Customer';

let _network = null;

export default class Store {
  @observable userToken;

  @observable customers;

  constructor({ token = null, customers = [] }) {
    this.userToken = token;
    _network = new Network(token);
    this.customers = customers;
  }

  @action.bound
  async getCustomers() {
    const res = await _network.get(urls.CUSTOMERS());
    this.customers = res.data.map(item => new Customer({ ...item }));
  }

  @action.bound
  async updateCustomer(id) {
    const res = await _network.get(urls.CUSTOMER(id));
    const index = this.customers.findIndex(item => item.id === id);
    this.customers[index].update(new Customer({ ...res.data }));
  }

  @action.bound
  updateUserToken(token) {
    this.userToken = token;
    _network = new Network(token);
  }
}
